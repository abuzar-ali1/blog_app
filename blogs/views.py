from django.shortcuts import render
from rest_framework import viewsets

from blogs.models import Blogs
from blogs.serializers import BlogSerializer
from rest_framework.response import Response
# Create your views here.

class BlogView(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = BlogSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)