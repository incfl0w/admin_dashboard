from rest_framework import generics
from django.http import JsonResponse
from django.contrib.auth.models import User, Group
from .serializers import UserCreateSerializer, UserUpdateSerializer, GroupSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .service import UserFilter, GroupFilter

class UserList(generics.ListCreateAPIView):
    serializer_class = UserCreateSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_class = UserFilter
    
    def get_queryset(self):
        return User.objects.all()
 
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserUpdateSerializer
    
    def get_queryset(self):
        return User.objects.all()
    
class GroupList(generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_class = GroupFilter
    
    def get_queryset(self):
        return Group.objects.all()
    
    
class GroupRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    
    def get_queryset(self):
        return Group.objects.all()
    
    def destroy(self, request, *args, **kwargs):
        if Group.objects.get(pk=kwargs['pk']).user_set.all():
            return JsonResponse({ 'success' : False, 'message': "Can't delete this because users assigned to group"}, status = 403)
        return super().destroy(request, *args, **kwargs)
    
 