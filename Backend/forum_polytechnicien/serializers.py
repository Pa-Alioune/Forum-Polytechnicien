from rest_framework import serializers
from django.contrib.auth import get_user_model
from forum_polytechnicien.models import Hobbie, CategoryHobbie, User
from django.contrib.auth.hashers import make_password
import re


class UserDetailSerializer(serializers.ModelSerializer):
    hobbies = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'name', 'profile_photo', 'hobbies']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
        )
        user.set_password(validated_data['password'])
        # if validated_data['profile_photo']:
        #     user.profile_photo = validated_data['profile_photo']
        user.save()
        # if validated_data['hobbies']:
        #     user.hobbies.set(validated_data['hobbies'])
        return user

    def get_hobbies(self, instance):
        queryset = instance.hobbies.all()
        serializer = HobbieListSerializer(queryset, many=True)
        return serializer.data


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'name',
                  'profile_photo', 'password', 'hobbies']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
        )
        user.set_password(validated_data['password'])
        # if validated_data['profile_photo']:
        #     user.profile_photo = validated_data['profile_photo']
        user.save()
        # if validated_data['hobbies']:
        #     user.hobbies.set(validated_data['hobbies'])
        return user

    def validate_email(self, value):
        if not re.search(r"^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@esp.sn", value):
            raise serializers.ValidationError(
                "Vous devez fournir un mail 'esp.sn' !")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déja utilisé !")
        return value


class CategoryHobbieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryHobbie
        fields = ['id', 'name', 'description', 'image', 'hobbies']


class CategoryHobbieDetailSerializer(serializers.ModelSerializer):
    hobbies = serializers.SerializerMethodField()

    class Meta:
        model = CategoryHobbie
        fields = ['id', 'name', 'description', 'image', 'hobbies']

    def get_hobbies(self, instance):
        queryset = instance.hobbies.all()
        serializer = HobbieListSerializer(queryset, many=True)
        return serializer.data


class HobbieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobbie
        fields = ['id', 'name', 'description', 'image', 'category_hobbie']


class HobbieDetailSerializer(serializers.ModelSerializer):
    category_hobbie = serializers.SerializerMethodField()

    class Meta:
        model = Hobbie
        fields = ['id', 'name', 'description', 'image', 'category_hobbie']

    def get_category_hobbie(self, instance):
        queryset = instance.category_hobbie
        serializer = CategoryHobbieListSerializer(queryset)
        return serializer.data
