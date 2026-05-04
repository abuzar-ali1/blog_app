from django.shortcuts import render
from rest_framework import viewsets

from apps.blogs.models import Blogs
from apps.blogs.serializers import BLogSerailizer
from rest_framework.response import Response
# Create your views here.

class BlogView(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = BLogSerailizer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)