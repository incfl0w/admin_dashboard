from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User, Group, Permission

class UserCreateSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        groups=validated_data['groups']
        user = User.objects.create_user(
            username=validated_data['username'], 
            password=validated_data['password'],
        )
        user.groups.set(groups)
        print(validated_data)
        return user   
     
    class Meta:
        model = User
        
        fields = ('id', 'email','username', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined', 'password', 'groups')
        read_only_fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined')
        
        
class UserUpdateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = User
        
        fields = ('id', 'email','username', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined', 'groups')
        read_only_fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
            'is_superuser', 'date_joined')

        
class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ('id', 'name', 'description')
        read_only_fields = ('id', )