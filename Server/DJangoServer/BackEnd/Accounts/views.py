from django.shortcuts import render
from .serializer import *
from rest_framework import viewsets
from .models import * 
from django.http import HttpResponse
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

