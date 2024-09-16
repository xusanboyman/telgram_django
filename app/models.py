from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.TextField(max_length=20, unique=True)
    bio = models.CharField(max_length=100)
    avatar = models.ImageField(null=True, upload_to='images', default='images/user.png')


# Model to represent a chat room

class Group(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Room(models.Model):
    host = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.TextField(max_length=100)
    type = models.ForeignKey(Group,on_delete=models.CASCADE,null=True)
    participants = models.ManyToManyField(User, related_name='rooms')

    def __str__(self):
        return self.name



# Model to represent individual messages
class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(null=False,blank=True)
    image = models.ImageField(upload_to='static/images/private',null=True,blank=True)
    file = models.FileField(null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.user.username} in {self.room}"
