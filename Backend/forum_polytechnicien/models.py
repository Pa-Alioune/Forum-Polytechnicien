from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.EmailField(
        unique=True, default="xxx@esp.sn", verbose_name="Email")
    first_name = None
    last_name = None
    email = None
    name = models.CharField(max_length=255, null=True, verbose_name="Nom")
    profile_photo = models.ImageField(verbose_name='Photo de profil')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
