from rest_framework import serializers
from rest_framework import exceptions

from .models import Admin,Certificate,Organization

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Organization
        fields = '__all__'
        
class CertificateCreateSerializer(serializers.ModelSerializer):
    # organization = OrganizationSerializer()
    class Meta:
        model = Certificate
        fields = '__all__'


class CertificateListSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer()
    class Meta:
        model = Certificate
        fields = '__all__'

    