from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import UserModelSerializer, UserModelExtendedSerializer
from .models import User


# Create your views here.

class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()

    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v1':
            return UserModelExtendedSerializer
        return UserModelSerializer

# class UserListApiView(ListAPIView):
#     queryset = User.objects.all()
#
#     serializer_class = UserModelSerializer
#
#     def get_serializer_class(self):
#         if self.request.version == 'v1':
#             return UserModelExtendedSerializer
#         return UserModelSerializer
