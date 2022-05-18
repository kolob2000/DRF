from rest_framework.serializers import ModelSerializer
from .models import ToDo, Project


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


