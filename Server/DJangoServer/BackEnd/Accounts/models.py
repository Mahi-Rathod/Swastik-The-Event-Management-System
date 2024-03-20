from django.db import models
from django.contrib.auth.models import AbstractUser

# class CustomerAccounts(models.Model):
class Products(models.Model):
    title = models.CharField(max_length = 100)
    description = models.CharField(max_length = 100)
    price = models.CharField(max_length = 100)
    category = models.CharField(max_length = 100)
    image = models.ImageField(upload_to='images/', default="")

    def __str__(self) -> str:
        return self.title
