from rest_framework import mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from django_filters import rest_framework as filters

from todoapp.filters import TodoFilter
from .models import ToDo, Project
from .serializers import ProjectModelSerializer, TodoModelSerializer
import todoapp.pagination as pages


# Create your views here.

class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = pages.ToDoPageNumberPagination
    # filterset_fields = '__all__'
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TodoFilter
    permission_classes = [IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        note = self.get_object()
        note.active = False
        note.save()
        return Response(data='Success! Notes was marked as completed')


class ProjectModelViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          mixins.ListModelMixin,
                          GenericViewSet):
    serializer_class = ProjectModelSerializer
    pagination_class = pages.ProjectPageNumberPagination

    def get_queryset(self):
        queryset = Project.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        return queryset
