from django.db import models

# Create your models here.

class Users(models.Model):
    username = models.CharField(("Username"), max_length=50)
    email = models.EmailField(("Email"), max_length=100)
    password = models.CharField(("Password"), max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.username    