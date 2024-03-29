from rest_framework import serializers
from django.contrib.auth import get_user_model
from forum_polytechnicien.models import *
from django.utils.text import slugify
from datetime import datetime
from time import strftime
import re


class UserDetailSerializer(serializers.ModelSerializer):
    hobbies = serializers.SerializerMethodField()
    follows = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    discuss_with = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'name', 'profile_photo',
                  'hobbies', 'slug', 'follows', 'followers', 'discuss_with', 'posts']
        extra_kwargs = {'password': {'write_only': True},
                        'posts': {'read_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def get_hobbies(self, instance):
        queryset = instance.hobbies.all()
        serializer = HobbieListSerializer(queryset, many=True)
        return serializer.data

    def get_follows(self, instance):
        queryset = instance.follows.all()
        serializer = UserListSerializer(queryset, many=True)
        return serializer.data

    def get_followers(self, instance):
        queryset = instance.followers.all()
        serializer = UserListSerializer(queryset, many=True)
        return serializer.data

    def get_discuss_with(self, instance):
        queryset = instance.discuss_with.all()
        serializer = UserListSerializer(queryset, many=True)
        return serializer.data

    def get_posts(self, instance):
        publications = instance.publications.all()
        questions = instance.questions.all()
        publications_serializer = PublicationListSerializer(
            publications, many=True)
        questions_serializer = QuestionListSerializer(questions, many=True)
        posts = list(publications_serializer.data) + \
            list(questions_serializer.data)
        posts = sorted(
            posts, key=lambda item: item['updated_at'], reverse=True)
        return posts


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'name',
                  'profile_photo', 'password', 'hobbies', 'slug', 'follows', 'followers']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
        )
        user.set_password(validated_data['password'])
        user.slug = slugify(
            str(f"{user.name} {datetime.now().strftime('%Y-%m-%d %H-%M %S')}"))
        user.save()

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
    category_hobbie = serializers.SerializerMethodField()

    class Meta:
        model = Hobbie
        fields = ['id', 'name', 'description', 'image', 'category_hobbie']

    def get_category_hobbie(self, instance):
        queryset = instance.category_hobbie
        serializer = CategoryHobbieListSerializer(queryset)
        return serializer.data


class HobbieDetailSerializer(serializers.ModelSerializer):
    category_hobbie = serializers.SerializerMethodField()

    class Meta:
        model = Hobbie
        fields = ['id', 'name', 'description', 'image', 'category_hobbie']

    def get_category_hobbie(self, instance):
        queryset = instance.category_hobbie
        serializer = CategoryHobbieListSerializer(queryset)
        return serializer.data


class QuestionListSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # récupération de l'objet request dans le contexte
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)

    owner = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    dislike = serializers.SerializerMethodField()
    responses = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'like', 'dislike', 'type', 'slug', 'contents', 'created_at', 'updated_at', 'owner',
                  'responses', 'hobbies', ]
        extra_kwargs = {'responses': {'read_only': True}, 'created_at': {
            'read_only': True}, 'updated_at': {'read_only': True}}

    def get_owner(self, instance):
        queryset = instance.owner
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_type(self, instance):
        return 'question'

    def get_responses(self, instance):
        queryset = instance.responses
        serializer = PublicationListSerializer(queryset, many=True)
        return serializer.data

    def get_like(self, instance):
        likes = instance.likedislikes.filter(vote=LikeDislike.LIKE).count()
        return likes

    def get_dislike(self, instance):
        dislikes = instance.likedislikes.filter(
            vote=LikeDislike.DISLIKE).count()
        return dislikes

    def create(self, validated_data):
        user = self.context['request'].user
        hobbies_data = validated_data.pop('hobbies')
        slug_data = slugify(validated_data['contents'])
        question = Question.objects.create(
            **validated_data, slug=slug_data, owner=user)
        for hobbie_data in hobbies_data:
            hobbie = Hobbie.objects.get(pk=hobbie_data['id'])
            question.hobbies.add(hobbie)
        return question


class QuestionForPublication(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'slug', 'contents')


class PublicationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicationImage
        fields = ('id', 'image', 'publication')


class PublicationListSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        # récupération de l'objet request dans le contexte
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)

    images = PublicationImageSerializer(
        many=True, required=False, allow_null=True)
    owner = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    question_concerned = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    dislike = serializers.SerializerMethodField()
    nb_comment = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = ('id', 'like', 'dislike', 'type', 'nb_comment', 'question_concerned', 'contents', 'slug', 'created_at', 'updated_at', 'owner',
                  'hobbies', 'question', 'comments', 'images')
        extra_kwargs = {'comments': {'read_only': True},
                        'votes': {'read_only': True}, 'created_at': {
            'read_only': True}, 'updated_at': {'read_only': True}, 'question': {'write_only': True}, 'question_concerned': {'read_only': True}
        }

    def get_owner(self, instance):
        queryset = instance.owner
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_comments(self, instance):
        queryset = instance.comments.order_by('updated_at')
        serializer = CommentSerializer(queryset, many=True)
        return serializer.data

    def get_nb_comment(self, instance):
        return instance.comments.count()

    def get_question_concerned(self, instance):
        queryset = instance.question
        serializer = QuestionForPublication(queryset)
        return serializer.data

    def get_type(self, instance):
        return 'publication'

    def get_like(self, instance):
        likes = instance.likedislikes.filter(vote=LikeDislike.LIKE).count()
        return likes

    def get_dislike(self, instance):
        dislikes = instance.likedislikes.filter(
            vote=LikeDislike.DISLIKE).count()
        return dislikes

    def create(self, validated_data):
        owner = self.context['request'].user
        images = self.context['request'].FILES.getlist('images')
        hobbies_data = validated_data.pop('hobbies')
        slug_data = slugify(datetime.now().strftime('%Y-%m-%d %H-%M %S'))
        publication = Publication.objects.create(
            **validated_data, owner=owner, slug=slug_data)

        for hobbie_data in hobbies_data:
            hobbie = Hobbie.objects.get(pk=hobbie_data['id'])
            publication.hobbies.add(hobbie)

        for image in images:
            publication_image = PublicationImage.objects.create(
                publication=publication)
            publication_image.image = image
            publication_image.save()

        return publication


class HobbieTimelineSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    publications = serializers.SerializerMethodField()

    class Meta:
        model = Hobbie
        fields = ('questions', 'publications')

    def get_questions(self, instance):
        queryset = instance.questions
        serializer = QuestionListSerializer(queryset, many=True)
        return serializer.data

    def get_publications(self, instance):
        queryset = instance.publications
        serializer = PublicationListSerializer(queryset, many=True)
        return serializer.data


class TimelineSerializer(serializers.Serializer):
    pass


class CommentSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()
    commentator = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    dislike = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'like', 'dislike', 'contents', 'created_at', 'updated_at', 'slug', 'publication',
                  'commentator', 'answers')
        extra_kwargs = {'answers': {'read_only': True}, 'created_at': {
            'read_only': True}, 'updated_at': {'read_only': True}}

    def get_answers(self, instance):
        queryset = instance.answers
        serializer = AnswerSerializer(queryset, many=True)
        return serializer.data

    def get_commentator(self, instance):
        queryset = instance.commentator
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_like(self, instance):
        likes = instance.likedislikes.filter(vote=LikeDislike.LIKE).count()
        return likes

    def get_dislike(self, instance):
        dislikes = instance.likedislikes.filter(
            vote=LikeDislike.DISLIKE).count()
        return dislikes

    def create(self, validated_data):
        commentator = self.context['request'].user
        slug = slugify(datetime.now().strftime('%Y-%m-%d %H-%M %S'))
        comment = Comment.objects.create(
            **validated_data, commentator=commentator, slug=slug)
        return comment


class AnswerSerializer(serializers.ModelSerializer):
    answerer = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    dislike = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = ('id', 'like', 'dislike', 'contents', 'created_at', 'updated_at', 'comment', 'answer',
                  'answers', 'answerer')
        extra_kwargs = {'votes': {'read_only': True},
                        'answers': {'read_only': True}, 'created_at': {
            'read_only': True}, 'updated_at': {'read_only': True}}

    def get_answerer(self, instance):
        queryset = instance.answerer
        serializer = UserListSerializer(queryset)
        return serializer.data

    def get_answers(self, instance):
        queryset = instance.answers
        serializer = AnswerSerializer(queryset, many=True)
        return serializer.data

    def get_like(self, instance):
        likes = instance.likedislikes.filter(vote=LikeDislike.LIKE).count()
        return likes

    def get_dislike(self, instance):
        dislikes = instance.likedislikes.filter(
            vote=LikeDislike.DISLIKE).count()
        return dislikes

    def create(self, validated_data):
        answerer = self.context['request'].user
        answer = Answer.objects.create(**validated_data, answerer=answerer)
        return answer


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeDislike
        fields = ('id', 'vote', 'user', 'publication',
                  'comment', 'question', 'answer')
