# Generated by Django 4.2.4 on 2023-09-04 08:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='certificate',
            old_name='Reg_no',
            new_name='reg_no',
        ),
    ]
