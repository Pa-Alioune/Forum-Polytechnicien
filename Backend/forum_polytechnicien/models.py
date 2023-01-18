from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from pathlib import Path


class CategoryHobbie(models.Model):
    name = models.CharField(max_length=255, verbose_name='nom')
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return self.name


class Hobbie(models.Model):
    name = models.CharField(max_length=255, verbose_name='nom')
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')
    category_hobbie = models.ForeignKey(
        CategoryHobbie, on_delete=models.CASCADE, related_name='hobbies', verbose_name='categorie')

    def __getitem__(self, key):
        if key == 'id':
            return self.id  # type: ignore
        elif key == 'name':
            return self.name
        else:
            raise KeyError

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError(
                'Les utilisateurs doivent avoir une adresse email !')

        user = self.model(
            email=self.normalize_email(email),
            name=name, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):

        user = self.create_user(
            email,
            password=password,
            name=name,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        unique=True, verbose_name="Email", max_length=255)
    name = models.CharField(max_length=255, null=True, verbose_name="Nom")
    slug = models.SlugField(null=True, blank=True)
    profile_photo = models.ImageField(
        null=True, blank=True, verbose_name='Photo de profil')
    hobbies = models.ManyToManyField(
        Hobbie, verbose_name='Centre d\'intêret', related_name="users", blank=True)
    is_active = models.BooleanField(default=True, verbose_name='est actif')
    is_admin = models.BooleanField(default=False, verbose_name='est admin')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Question(models.Model):
    contents = models.CharField(
        max_length=255, unique=True, verbose_name="contenu")
    slug = models.SlugField(max_length=255, null=True, blank=True, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name="questions", verbose_name="propriétaire", blank=True)
    hobbies = models.ManyToManyField(
        Hobbie, verbose_name='Centre d\'intêret', related_name='questions', blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return str(self.slug)


class Publication(models.Model):
    contents = models.TextField(null=True, blank=True, verbose_name="contenu")
    slug = models.SlugField(max_length=255, null=True, blank=True, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name="publications", verbose_name="propriétaire", blank=True)
    hobbies = models.ManyToManyField(
        Hobbie, verbose_name='Centre d\'intêret', related_name="publications", blank=True)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="responses", null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return str(self.slug)


class PublicationImage(models.Model):
    image = models.ImageField()
    publication = models.ForeignKey(
        Publication, on_delete=models.CASCADE, related_name="images")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return self.image


class Comment(models.Model):
    contents = models.TextField(verbose_name="contenu")
    slug = models.SlugField(max_length=255, null=True, blank=True, unique=True)
    publication = models.ForeignKey(
        Publication, on_delete=models.CASCADE, related_name="comments")
    commentator = models.ForeignKey(User, on_delete=models.CASCADE,
                                    related_name="comments", verbose_name="commentateur")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return self.slug


class Answer(models.Model):
    slug = models.SlugField(max_length=255, null=True, blank=True, unique=True)
    contents = models.TextField(verbose_name="contenu")
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE,
                                related_name="answers", verbose_name="commentaire", null=True, blank=True)
    answer = models.ForeignKey('Answer', on_delete=models.CASCADE,
                               related_name="answers", verbose_name="réponse", null=True, blank=True)
    answerer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="answers", verbose_name="répondeur")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return self.slug


class Vote(models.Model):
    value = models.BooleanField(null=True)
    voter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="votes", verbose_name="votant")
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE,
                                related_name="votes", verbose_name="commentaire", null=True, blank=True)
    publication = models.ForeignKey(
        Publication, on_delete=models.CASCADE, related_name="votes", null=True, blank=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE,
                               related_name="votes", verbose_name="réponse", null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return self.value


class RequestModification(models.Model):
    slug = models.SlugField(max_length=255, null=True, blank=True, unique=True)
    contents = models.TextField(verbose_name="contenu")
    question = models.ForeignKey(Question, on_delete=models.SET_NULL,
                                 null=True, blank=True, related_name="requests_modification")
    applicant = models.ForeignKey(User, on_delete=models.SET_NULL,
                                  null=True, blank=True, related_name="requests_modification_send", verbose_name="demandeur de modification")
    question_owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="requests_modification_received", verbose_name="propriétaire de la question")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='créé le')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='modifié le')

    def __str__(self):
        return self.slug
