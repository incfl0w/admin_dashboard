from django.urls import include, path
from .views import UserList, UserRetrieveUpdateDestroy, \
                  GroupList, GroupRetrieveUpdateDestroy

urlpatterns = [
  #users
  path('users/', UserList.as_view()),
  path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view() ), 
  #groups
  path('groups/', GroupList.as_view()),   
  path('groups/<int:pk>/', GroupRetrieveUpdateDestroy.as_view()),
]
