from django.urls import path, include

from rest_framework.routers import DefaultRouter
from apps.blogs.views import BlogView ,CommentView

router  = DefaultRouter()
router.register(r'blogs', BlogView, basename='blogs')
router.register(r'comments', CommentView, basename='comments')

urlpatterns = [
    path('api/', include(router.urls)),
    # path('api/blogs/<int:blog_id>/comments/', CommentView.as_view(), name='blog-comments'),
    # path('api/blogs/<int:blog_id>/comments/<int:pk>/', CommentView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='blog-comment'),
]

