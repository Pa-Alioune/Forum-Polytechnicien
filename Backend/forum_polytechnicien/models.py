from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CategoryHobbie(models.Model):
    name = models.CharField(max_length=255, verbose_name='nom')
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name


class Hobbie(models.Model):
    name = models.CharField(max_length=255, verbose_name='nom')
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    category_hobbie = models.ForeignKey(
        CategoryHobbie, on_delete=models.CASCADE, related_name='hobbies', verbose_name='categorie')

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
    profile_photo = models.ImageField(
        null=True, blank=True, verbose_name='Photo de profil')
    hobbies = models.ManyToManyField(Hobbie, verbose_name='Centre d\'intêret')
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
