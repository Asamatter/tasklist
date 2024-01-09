from django.urls import path
from .views import *

urlpatterns = [
    path('tasks/', TodoList.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TodoTaskDetail.as_view(), name='task-detail'),
]