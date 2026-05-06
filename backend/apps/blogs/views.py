from django.shortcuts import render
from rest_framework import viewsets

from apps.blogs.models import Blog, Comment
from apps.blogs.serializers import BLogSerailizer , CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q



# Create your views here.

class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BLogSerailizer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        
        if user.is_authenticated:
            return Blog.objects.filter(Q(author__is_staff=True) | Q(author=user)).order_by('-created_at')
        
        return Blog.objects.filter(author__is_staff=True).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)    

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    