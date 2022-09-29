from rest_framework import generics
from django.contrib.auth.models import User, Group
from .serializers import UserCreateSerializer, UserUpdateSerializer, GroupSerializer

class UserList(generics.ListCreateAPIView):
    serializer_class = UserCreateSerializer
    
    def get_queryset(self):
        return User.objects.all()
 
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserUpdateSerializer
    
    def get_queryset(self):
        return User.objects.all()
    
class GroupList(generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    
    def get_queryset(self):
        return Group.objects.all()
    
    
class GroupRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    
    def get_queryset(self):
        return Group.objects.all()
    
 