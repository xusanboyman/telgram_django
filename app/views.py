from django.shortcuts import render,get_object_or_404
from .models import Room, User, Message
from django.db.models import Q
from .forms import MessageForm

def home(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''

    rooms = Room.objects.filter(
      Q(username__icontains=q)
    )
    users = User.objects.all()  # Fetch all users
    context = {'users': users, 'rooms': rooms}
    return render(request, 'app/home.html', context)


# Messages view to display messages in a specific room
def room(request, room_id):
    users = User.objects.all()
    rooms = Room.objects.all()
    room = get_object_or_404(Room, id=room_id)  # Fetch the room by id
    messages = Message.objects.filter(room=room).order_by('timestamp')  # Fetch all messages in the room
    context = {
        'room': room,
        'messages': messages,
        'users': users,
        'rooms': rooms
    }
    return render(request, 'app/chattingroom.html', context)
