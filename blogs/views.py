from django.shortcuts import render
from rest_framework import viewsets

from blogs.models import Blogs
# from blogs.serializers import BlogSerializer
# Create your views here.

def BlogView(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    # serializer_class = BlogSerializer