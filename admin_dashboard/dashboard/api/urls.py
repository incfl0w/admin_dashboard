from django.urls import include, path
from .views import UserList, GroupList

urlpatterns = [
  path('users/', UserList.as_view()),
  path('groups/', GroupList.as_view()),   
]
