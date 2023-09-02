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


class Certificate_upload_api(APIView):
    def get(self, request):
        data = Certificate.objects.all()
        serializer = CertificateSerializer(data, many=True)
        print(serializer.data)
        return JsonResponse(serializer.data, safe=False) 

    def post(self,request):
        seralizer = CertificateSerializer(data=request.data) 
        if seralizer.is_valid():
            seralizer.save()
            return Response(seralizer.data)
        else:
            return Response(seralizer.errors)