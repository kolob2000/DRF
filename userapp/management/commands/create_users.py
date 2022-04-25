from django.core.management.base import BaseCommand
from userapp.models import User


class Command(BaseCommand):
    names = [
        ['Николай', 'Щербаков'],
        ['Андрей', 'Петров'],
        ['Лев', 'Корнеев'],
        ['Александр', 'Малявин'],
        ['Дмитрий', 'Поляев'],
        ['Сергей', 'Романов'],
    ]

    def handle(self, *args, **options):
        count = 0
        for name in self.names:
            if count == 0:
                super_user = User.objects.create_superuser('admin', 'k.kolabis@mail.ru', 'admin',
                                                           **{'first_name': name[0], 'last_name': name[1]})
            else:
                user = User.objects.create_user(f'user{count}', f'user{count}@mail.ru', 'admin',
                                                **{'first_name': name[0], 'last_name': name[1]})
            count += 1
