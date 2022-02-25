from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    REQUIRED_FIELDS = ('email',)

    class Meta:
        unique_together = ('email',)
        verbose_name_plural = 'Пользователи'
        verbose_name = 'Пользователь'
