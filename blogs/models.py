from django.db import models

# Create your models here.

class Blogs(models.Model):
    title = models.CharField(("Title"), max_length=50)
    desc = models.TextField(("Description"), max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.title