from rest_framework import generics
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer

class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        return User.objects.all()
    
    
class GroupList(generics.ListAPIView):
    serializer_class = GroupSerializer
    
    def get_queryset(self):
        return Group.objects.all()