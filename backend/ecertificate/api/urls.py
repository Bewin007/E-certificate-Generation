from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from .views import Organization_api,CertificateList,Admin_api

urlpatterns = [
    path('org/', Organization_api.as_view(), name='org-create'),
    path('org/<int:pk>/', Organization_api.as_view(), name='org-del'),
    path('certificates/', CertificateList.as_view(), name='certificate-list'),
    path('admin/', Admin_api.as_view(), name='create-certificate'),
    # path('admi/<int:pk>/', Admin_api.as_view(), name='admin-certificate-detail'),
    # path('user', User_api.as_view(), name='admin-certificate-detail'),
    # path('test', CertificateCreate.as_view(), name='admin-certificate-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)