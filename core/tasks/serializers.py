from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    # We mark 'user' as read-only because we will automatically pull 
    # the logged-in user from the JWT token, rather than letting the frontend pass it.
    user = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Task
        fields = ('id', 'user', 'title', 'description', 'status', 'priority', 'created_at')