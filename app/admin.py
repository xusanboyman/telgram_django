from django.contrib import admin
from .models import Room,User,Message,Group

# Register your models here.
admin.site.register(Room)
admin.site.register(Message)
admin.site.register(Group)
admin.site.register(User)
