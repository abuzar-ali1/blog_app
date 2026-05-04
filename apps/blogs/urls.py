from django.urls import path, include

from rest_framework.routers import DefaultRouter
from apps.blogs.views import BlogView

router  = DefaultRouter()
router.register(r'api/blogs', BlogView, basename='blogs')


urlpatterns = [
    path('', include(router.urls)),
       
]

