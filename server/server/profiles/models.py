from django.db import models

class Profile(models.Model):
    profile_picture = models.ImageField(
        upload_to='images'
    )