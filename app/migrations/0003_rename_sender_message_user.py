# Generated by Django 5.1.1 on 2024-09-15 01:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_group_room_message_delete_rooms'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='sender',
            new_name='user',
        ),
    ]
