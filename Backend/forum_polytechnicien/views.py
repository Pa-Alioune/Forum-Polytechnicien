from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from forum_polytechnicien.serializers import *
from rest_framework.permissions import IsAuthenticated
from forum_polytechnicien.models import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
from rest_framework.decorators import action
import logging
import json
# import ipdb


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


class LikeDislikeViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = VoteSerializer
    queryset = LikeDislike.objects.all()
    permission_classes = [IsAuthenticated]

    def update_or_create_vote(self, vote_type, request, pk=None, value=LikeDislike.LIKE):
        if vote_type == 'publication':
            id_publication = request.data.get('publication', 0)
            publication = Publication.objects.get(id=id_publication)
            if value == 0:
                like_dislike = LikeDislike.objects.get(
                    publication=publication, user=request.user)
                like_dislike.delete()
                return Response({'result': 'Réaction supprimée avec succée !'})

            vote, _ = LikeDislike.objects.update_or_create(
                publication=publication,
                user=request.user,
                defaults={'vote': value}
            )
            serializer = self.get_serializer(vote)
            return Response(serializer.data)

        elif vote_type == 'question':
            id_question = request.data.get('question', 0)
            question = Question.objects.get(id=id_question)
            if value == 0:
                like_dislike = LikeDislike.objects.get(
                    question=question, user=request.user)
                like_dislike.delete()
                return Response({'result': 'Réaction supprimée avec succée !'})
            vote, _ = LikeDislike.objects.update_or_create(
                question=question,
                user=request.user,
                defaults={'vote': value}
            )
            serializer = self.get_serializer(vote)
            return Response(serializer.data)

        elif vote_type == 'comment':
            id_comment = request.data.get('comment', 0)
            comment = Comment.objects.get(id=id_comment)
            if value == 0:
                like_dislike = LikeDislike.objects.get(
                    comment=comment, user=request.user)
                like_dislike.delete()
                return Response({'result': 'Réaction supprimée avec succée !'})
            vote, _ = LikeDislike.objects.update_or_create(
                comment=comment,
                user=request.user,
                defaults={'vote': value}
            )
            serializer = self.get_serializer(vote)
            return Response(serializer.data)

        elif vote_type == 'answer':
            id_answer = request.data.get('answer', 0)
            answer = Answer.objects.get(id=id_answer)
            if value == 0:
                like_dislike = LikeDislike.objects.get(
                    answer=answer, user=request.user)
                like_dislike.delete()
                return Response({'result': 'Réaction supprimée avec succée !'})
            vote, _ = LikeDislike.objects.update_or_create(
                answer=answer,
                user=request.user,
                defaults={'vote': value}
            )
            serializer = self.get_serializer(vote)
            return Response(serializer.data)

# Définition des actions pour les likes
    @action(detail=True, methods=['post'])
    def like_publication(self, request, pk=None):
        return self.update_or_create_vote('publication', request, pk)

    @action(detail=True, methods=['post'])
    def like_comment(self, request, pk=None):
        return self.update_or_create_vote('comment', request, pk)

    @action(detail=True, methods=['post'])
    def like_question(self, request, pk=None):
        return self.update_or_create_vote('question', request, pk)

    @action(detail=True, methods=['post'])
    def like_answer(self, request, pk=None):
        return self.update_or_create_vote('answer', request, pk)

# Définition des actions pour les dislikes
    @action(detail=True, methods=['post'])
    def dislike_publication(self, request, pk=None):
        return self.update_or_create_vote('publication', request, pk, LikeDislike.DISLIKE)

    @action(detail=True, methods=['post'])
    def dislike_comment(self, request, pk=None):
        return self.update_or_create_vote('comment', request, pk, LikeDislike.DISLIKE)

    @action(detail=True, methods=['post'])
    def dislike_question(self, request, pk=None):
        return self.update_or_create_vote('question', request, pk, LikeDislike.DISLIKE)

    @action(detail=True, methods=['post'])
    def dislike_answer(self, request, pk=None):
        return self.update_or_create_vote('answer', request, pk, LikeDislike.DISLIKE)


# Définition des actions pour les undo

    @action(detail=True, methods=['post'])
    def undo_publication(self, request, pk=None):
        return self.update_or_create_vote('publication', request, pk, 0)

    @action(detail=True, methods=['post'])
    def undo_comment(self, request, pk=None):
        return self.update_or_create_vote('comment', request, pk, 0)

    @action(detail=True, methods=['post'])
    def undo_question(self, request, pk=None):
        return self.update_or_create_vote('question', request, pk, 0)

    @action(detail=True, methods=['post'])
    def undo_answer(self, request, pk=None):
        return self.update_or_create_vote('answer', request, pk, 0)


class QuestionBySlugViewSet(MultipleSerializerMixin, ModelViewSet):
    def retrieve_by_slug(self, request, slug=None):
        question = Question.objects.get(slug=slug)
        serializer = QuestionListSerializer(question)
        return Response(serializer.data)


class UserBySlugViewSet(MultipleSerializerMixin, ModelViewSet):
    def retrieve_by_slug(self, request, slug=None):
        user = User.objects.get(slug=slug)
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)
