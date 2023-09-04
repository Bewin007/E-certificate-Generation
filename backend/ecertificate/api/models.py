from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Admin(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=16)
    name = models.CharField(max_length=100)

class Organization(models.Model):
    logo = models.FileField(upload_to='uploads/',default='')
    name = models.CharField(max_length=100,default='')
    description = models.CharField(max_length=1000,default='')
    def __str__(self):
        return self.name

class Certificate(models.Model):
    reg_no = models.CharField(max_length=11,default='')
    name = models.CharField(max_length=100,default='')
    email = models.EmailField(default='')
    event_name = models.CharField(max_length=100,default='')
    summary_event = models.CharField(max_length=200,default='')
    file = models.FileField(upload_to='uploads/')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    def __str__(self):
        return self.reg_no



