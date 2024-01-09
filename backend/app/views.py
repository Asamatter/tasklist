from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status

# Create your views here.

class TodoList(APIView):
    def get(self, request):
        tasks = Todo.objects.all()
        serializer = TodoSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



class TodoTaskDetail(APIView):
    def get_object(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        task = self.get_object(pk)
        serializer = TodoSerializer(task)
        return Response(serializer.data)
        
    def put(self, request, pk):
            task = self.get_object(pk)
            
            # Check if the 'completed' field is present in the request data
            if 'completed' in request.data:
                # If 'completed' is present, toggle the completion status
                task.completed = not task.completed
                task.save()
            else:
                # If 'completed' is not present, update the task with the provided data
                serializer = TodoSerializer(task, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Serialize the updated task and include it in the response
            serializer = TodoSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    