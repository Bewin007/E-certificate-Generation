from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from .views import Certificate_upload_api

urlpatterns = [
    path('upload', Certificate_upload_api.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

