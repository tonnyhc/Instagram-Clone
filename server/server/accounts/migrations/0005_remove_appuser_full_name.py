# Generated by Django 4.2 on 2023-05-15 19:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_appuser_is_confirmed_alter_appuser_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appuser',
            name='full_name',
        ),
    ]
