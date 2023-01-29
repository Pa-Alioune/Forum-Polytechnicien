from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from forum_polytechnicien.serializers import *
from rest_framework.permissions import IsAuthenticated
from forum_polytechnicien.models import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
import logging
import json
import ipdb


class MultipleSerializerMixin:

    detail_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.detail_serializer_class is not None:  # type: ignore
            return self.detail_serializer_class
        return super().get_serializer_class()  # type: ignore


class UserViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = UserListSerializer
    detail_serializer_class = UserDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(is_active=True)


class HobbieViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = HobbieListSerializer
    detail_serializer_class = HobbieDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Hobbie.objects.all()


class CategoryHobbieViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = CategoryHobbieListSerializer
    detail_serializer_class = CategoryHobbieDetailSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CategoryHobbie.objects.all()


class UserConnectedViewSet(MultipleSerializerMixin, ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response({'user': serializer.data})


class QuestionListViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = QuestionListSerializer
    detail_serializer_class = QuestionListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Question.objects.all()


class PublicationListViewSet(MultipleSerializerMixin, ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = PublicationListSerializer
    detail_serializer_class = PublicationListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Publication.objects.all()


class TimelineViewSet(MultipleSerializerMixin, ModelViewSet):
    queryset = []
    serializer_class = TimelineSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user
        user_hobbies = list(user.hobbies.all())
        list_ids = [hobbie.id for hobbie in user_hobbies]
        publications = PublicationListSerializer(
            Publication.objects.filter(Q(hobbies__in=list_ids)).distinct(), many=True).data
        questions = QuestionListSerializer(
            Question.objects.filter(Q(hobbies__in=user_hobbies)).distinct(), many=True).data
        # ipdb.set_trace()
        timeline = list(publications) + list(questions)
        timeline = sorted(
            timeline, key=lambda item: item['updated_at'], reverse=True)
        return Response(timeline)


class CommentViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = CommentSerializer
    detail_serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.all()


class AnswerViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = AnswerSerializer
    detail_serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Answer.objects.all()
