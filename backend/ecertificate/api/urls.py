from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from .views import Organization_api,CertificateList,Admin_api,Create_admin

urlpatterns = [
    path('org/', Organization_api.as_view(), name='org-create'),
    path('org/<int:pk>/', Organization_api.as_view(), name='org-del'),
    path('certificates/', CertificateList.as_view(), name='certific'),
    path('admin/', Admin_api.as_view(), name='create certificate '),
    path('admin/add', Create_admin.as_view(), name='Add admin'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)