from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User, Group, Permission

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'], 
            password=validated_data['password']
        )
        return user   
     
    class Meta:
        model = User
        
        fields = ('id', 'email','username', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined', 'password', 'groups')
        read_only_fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined', 'groups')

        
        
class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('__all__')
        
class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionsSerializer(many=True)
    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')