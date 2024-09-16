from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='home'),
    path('a/<int:room_id>/', views.room, name='room'),
    ]