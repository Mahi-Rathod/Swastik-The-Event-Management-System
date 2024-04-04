from django.db import models
from django.contrib.auth.models import AbstractUser

class Category(models.Model):
    name = models.CharField(max_length  = 100)

    def __str__(self) -> str:
        return self.name

class Vendor(models.Model):
    pass

class Product(models.Model):
    name        = models.CharField(max_length = 100)
    description = models.CharField(max_length = 100)
    price       = models.CharField(max_length = 100)
    image       = models.ImageField(upload_to='images/', default="")
    category    = models.ForeignKey(Category, on_delete = models.CASCADE)
    sold        = models.IntegerField(default = 0)
    # owner       = models.ForeignKey(Vendor, on_delete  = models.CASCADE)

    def __str__(self) -> str:
        return self.name


class Customer(models.Model):
    pass
