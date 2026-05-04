from django.urls import path, include

from rest_framework.routers import DefaultRouter
from apps.users.views import Userview, UserRegisterView
router  = DefaultRouter()
router.register(r'api/users', Userview, basename='users')
router.register(r'api/register', UserRegisterView, basename='register')


urlpatterns = [
    path('', include(router.urls)),
]


