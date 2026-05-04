from django.shortcuts import render
from rest_framework import viewsets

from apps.users.serializers import UserSerializer
from .models import User


# Create your views here.
class Userview(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

