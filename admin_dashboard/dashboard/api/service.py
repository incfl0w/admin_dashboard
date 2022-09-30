from dataclasses import field
from django_filters import rest_framework as filters
from django.contrib.auth.models import User, Group


class UserFilter(filters.FilterSet):
    username = filters.CharFilter(
        field_name='username', lookup_expr='icontains')
    date_joined = filters.DateRangeFilter()
    is_superuser = filters.BooleanFilter()

    class Meta:
        model = User
        fields = ['username', 'is_superuser',  'date_joined', 'groups']


class GroupFilter(filters.FilterSet):
    user = filters.CharFilter(field_name='user__username')
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Group
        fields = ['user']
