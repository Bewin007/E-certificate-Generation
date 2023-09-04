from django.db import models

# Create your models here.

class Admin(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=16)
    name = models.CharField(max_length=100)

class Certificate(models.Model):
    reg_no = models.CharField(max_length=11)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    event_name = models.CharField(max_length=100)
    file = models.FileField(upload_to='uploads/')
