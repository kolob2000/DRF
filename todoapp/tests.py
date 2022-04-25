import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from userapp.models import User
from .views import ToDoModelViewSet, ProjectModelViewSet
from .models import ToDo, Project
from rest_framework.authtoken.models import Token


class TestTodoViewSet(TestCase):
    def test_get_note_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/v1/notes/')
        view = ToDoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        user = User.objects.create_superuser(id=1, username='admin', email='admin@mail.ru', password='admin')
        new_note = {
            "title": "Подбор специалистов",
            "user_list": 1,
        }
        client = APIClient()
        client.login(username='admin', password='admin')
        response = client.post('/api/v1/projects/', data=new_note)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestTodoApiTestCase(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/v1/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_with_mixer(self):
        note = mixer.blend(ToDo)
        user = User.objects.create_superuser(id=1, username='admin', email='admin@mail.ru', password='admin')
        self.client.login(username='admin', password='admin')
        response = self.client.put(f'/api/v1/notes/{note.id}/',
                                   {'title': 'Заметочка', 'active': True, 'project': note.project.id,
                                    'create_by_user': note.create_by_user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
