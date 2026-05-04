from django.urls import path, include

from rest_framework.routers import DefaultRouter
from apps.users.views import UserLoginView, Userview, UserRegisterView
router  = DefaultRouter()
router.register(r'api/users', Userview, basename='users')
router.register(r'api/register', UserRegisterView, basename='register')
router.register(r'api/login', UserLoginView, basename='login')

urlpatterns = [
    path('', include(router.urls)),
]


