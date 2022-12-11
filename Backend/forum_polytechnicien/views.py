from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from forum_polytechnicien.serializers import UserListSerializer, UserDetailSerializer, HobbieListSerializer, HobbieDetailSerializer, CategoryHobbieListSerializer, CategoryHobbieDetailSerializer
from rest_framework.permissions import IsAuthenticated
from forum_polytechnicien.models import Hobbie, CategoryHobbie, User


class MultipleSerializerMixin:

    detail_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.detail_serializer_class is not None:  # type: ignore
            return self.detail_serializer_class
        return super().get_serializer_class()  # type: ignore


class UserViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = UserListSerializer
    detail_serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(is_active=True)


class HobbieViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = HobbieListSerializer
    detail_serializer_class = HobbieDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Hobbie.objects.all()


class CategoryHobbieViewSet(MultipleSerializerMixin, ModelViewSet):
    serializer_class = CategoryHobbieListSerializer
    detail_serializer_class = CategoryHobbieDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CategoryHobbie.objects.all()
