# Generated by Django 4.2.4 on 2023-09-04 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_reg_no_certificate_reg_no'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ecertificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reg_no', models.CharField(max_length=11)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('event_name', models.CharField(max_length=100)),
                ('file', models.FileField(upload_to='uploads/')),
            ],
        ),
    ]