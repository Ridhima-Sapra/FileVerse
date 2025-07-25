from django.urls import path
from .views import caption_view

urlpatterns = [path('caption/', caption_view)]
