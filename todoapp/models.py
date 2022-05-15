from django.db import models

# Create your models here.
from todo_list import settings
from userapp.models import User


class Project(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False, verbose_name='Название')
    url_repo = models.URLField(default='http://exaple.com', verbose_name = 'ссылка')
    user_list = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='пользователи')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='проект')
    create_by_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='создатель')
    title = models.CharField(max_length=255, blank=False, null=False, verbose_name='Название')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='дата изменения')
    active = models.BooleanField(default=True, verbose_name='активно')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
