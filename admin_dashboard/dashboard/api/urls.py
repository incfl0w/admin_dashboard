from django.urls import include, path
from .views import UserList, GroupList, UserRetrieveUpdateDestroy

urlpatterns = [
  path('users/', UserList.as_view()),
  path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view() ), 
  path('groups/', GroupList.as_view()),   
]
