from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AdminSerializer, CertificateSerializer
from .models import Admin,Certificate


from rest_framework import status

class Admin_api(APIView):
    def get(self, request):
        data = Certificate.objects.all()
        serializer = CertificateSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = CertificateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            certificate = Certificate.objects.get(pk=pk)
        except Certificate.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CertificateSerializer(certificate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            certificate = Certificate.objects.get(pk=pk)
        except Certificate.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        certificate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class User_api(APIView):
    def post(self,request):
        search_method = request.data.get('search_method')
        data = request.data.get('value')
        if search_method == 'email':
            complex_data = Certificate.objects.filter(email = data)
            serializer = CertificateSerializer(complex_data,many = True)
            return Response(serializer.data)
        
        elif search_method == 'Register_number':
            complex_data = Certificate.objects.filter(reg_no=data)
            serializer = CertificateSerializer(complex_data,many = True)
            return Response(serializer.data)

        print(data)
        return Response('Send a valid Search Method')