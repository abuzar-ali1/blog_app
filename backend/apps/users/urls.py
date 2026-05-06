from ctypes.macholib import framework

from django.urls import path, include

from rest_framework.routers import DefaultRouter
from apps.users.views import Userview, UserRegisterView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView

router  = DefaultRouter()
router.register(r'users', Userview, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', UserRegisterView.as_view(), name='register'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]





