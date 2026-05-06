from django.db import models
from apps.users.models import User
from django.conf import settings
# Create your models here.



class Comment(models.Model):
    blog = models.ForeignKey('Blog', on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(("Content"), max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Comment by {self.author} on {self.blog.title}"    
    

class Blog(models.Model):
    title = models.CharField(("Title"), max_length=50)
    desc = models.TextField(("Description"), max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blogs', default=None, blank=True)
    
    def __str__(self):
        return self.title
