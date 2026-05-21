from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer

from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # RBAC Check: If the logged-in account is staff/admin, expose everything!
        if user.is_staff:
            return Task.objects.all().order_by('-id')
            
        # Regular User: Expose only tasks owned by them
        return Task.objects.filter(user=user).order_by('-id')

    def perform_create(self, serializer):
        # Automatically tie the newly created task to the logged-in user
        serializer.save(user=self.request.user)