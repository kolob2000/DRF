from django.contrib import admin

# Register your models here.
from todoapp.models import Project, ToDo


class ProjectUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('title',)


class ToDoUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'create_by_user')
    list_display_links = ('title', 'create_by_user')


admin.site.register(Project, ProjectUserAdmin)
admin.site.register(ToDo, ToDoUserAdmin)
