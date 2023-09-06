from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.

from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .serializers import AdminSerializer, CertificateCreateSerializer,OrganizationSerializer,CertificateListSerializer
from .models import Admin,Certificate,Organization


#create view and del organization
class Organization_api(APIView):
    def get(self, request):
        data = Organization.objects.all()
        serializer = OrganizationSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self,request):
        username = request.data.get("username")
        password = request.data.get("password")
        try:
            admin = Admin.objects.get(username=username, password=password)
        except Admin.DoesNotExist:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        username = request.data.get("username")
        password = request.data.get("password")
        try:
            admin = Admin.objects.get(username=username, password=password)
            certificate = Organization.objects.get(pk=pk)
        except Certificate.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        certificate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

#view certificate for user
class CertificateList(APIView):
    def get(self,request):
        data = Certificate.objects.all()
        serializer = CertificateListSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        search_method = request.data.get('search_method')
        data = request.data.get('data')
        if search_method == 'email':
            certificates = Certificate.objects.filter(email=data)
            serializer = CertificateListSerializer(certificates, many=True)
            return Response(serializer.data)
        elif search_method == 'reg_no':
            certificates = Certificate.objects.filter(reg_no = data)
            serializer = CertificateListSerializer(certificates, many=True)
            return Response(serializer.data)
        return Response("Enter a Valid String")


#create certificate by admin
class Admin_api(APIView):
    def post(self, request):
            username = request.data.get("username")
            password = request.data.get("password")
            print(request.data)
            try:
                # admin = Admin.objects.get(username=username, password=password)
                pass
            except Admin.DoesNotExist:
                return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = CertificateCreateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#create admin user 
class Create_admin(APIView):
    def get(self,requset):#Display all admin user
        data = Admin.objects.all()
        serializer = AdminSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self,request): #create admin user
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
