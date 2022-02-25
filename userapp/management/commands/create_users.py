from django.core.management.base import BaseCommand
from userapp.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        super_user = User.objects.create_superuser('admin', 'k.kolabis@mail.ru', 'admin',
                                                   **{'first_name': 'Николай', 'last_name': 'Щербаков'})
        user = User.objects.create_user('user1', 'user1@mail.ru', 'user123',
                                        **{'first_name': 'Андрей', 'last_name': 'Петров'})
        user = User.objects.create_user('user2', 'user2@mail.ru', 'user123',
                                        **{'first_name': 'Лев', 'last_name': 'Корнеев'})
        user = User.objects.create_user('user3', 'user3@mail.ru', 'user123',
                                        **{'first_name': 'Александр', 'last_name': 'Малявин'})
        user = User.objects.create_user('user4', 'user4@mail.ru', 'user123',
                                        **{'first_name': 'Сергей', 'last_name': 'Романов'})
        user = User.objects.create_user('user5', 'user5@mail.ru', 'user123',
                                        **{'first_name': 'Дмитрий', 'last_name': 'Поляев'})
