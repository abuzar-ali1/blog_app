from django.shortcuts import render
from rest_framework import viewsets

from apps.blogs.models import Blog, Comment
from apps.blogs.serializers import BLogSerailizer , CommentSerializer
from rest_framework.permissions import IsAuthenticated , IsAuthenticatedOrReadOnly


# Create your views here.

class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BLogSerailizer
    permission_classes = [IsAuthenticatedOrReadOnly]



class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    