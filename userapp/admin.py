from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from userapp.models import User


# Register your models here.
class UserAdminUser(UserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
    )


admin.site.register(User, UserAdminUser)
