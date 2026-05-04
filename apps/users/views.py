from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny , IsAdminUser
from apps.users.serializers import UserSerializer
from .models import User


# Create your views here.
class Userview(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

class UserRegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]