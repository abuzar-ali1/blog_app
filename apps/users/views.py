from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny , IsAdminUser , IsAuthenticated , TokenAuthentication
from apps.users.serializers import UserSerializer
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

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



class UserLoginView(ObtainAuthToken):
    def post(self , request , *args , **kwargs):
        serializer = self.serializer_class(data=request.data , context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token , created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})