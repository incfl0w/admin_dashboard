from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User, Group, Permission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined', 'password', 'groups')
    

        
        
class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('__all__')
        
class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionsSerializer(many=True)
    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')