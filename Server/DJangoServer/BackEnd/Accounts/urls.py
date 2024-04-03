from .views import *
from rest_framework import routers
from django.urls import path,include

router = routers.DefaultRouter()
router.register('products',ProductViewSet, basename='product')

urlpatterns = []

urlpatterns += router.urls
