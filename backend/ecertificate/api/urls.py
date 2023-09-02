from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from .views import Admin_api

urlpatterns = [
    path('admin/', Admin_api.as_view(), name='admin-certificates-list'),
    path('admi/<int:pk>/', Admin_api.as_view(), name='admin-certificate-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

