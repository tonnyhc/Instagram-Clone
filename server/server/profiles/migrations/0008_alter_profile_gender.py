# Generated by Django 4.2 on 2023-06-24 14:07

from django.db import migrations, models
import server.profiles.utils


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_alter_profile_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('PreferNotToSay', 'PreferNotToSay'), ('Other', 'Other')], default=server.profiles.utils.GenderChoices['PreferNotToSay'], max_length=18),
        ),
    ]
