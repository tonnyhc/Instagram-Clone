from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class ProfileManager(models.Manager):
    """
    This method only takes full_name and the user instance,
    because when the user registers there is only filed for a full_name, this can be added later on in settings
    """
    def create_profile(self, full_name, user):
        profile = self.model(
            full_name=full_name,
            user=user
        )

        profile.save()
        return profile


class Profile(models.Model):
    MAX_LEN_FULL_NAME = 150
    MAX_LEN_BIO = 250
    profile_picture = models.ImageField(
        upload_to='profile-pictures/'
    )
    full_name = models.CharField(
        max_length=MAX_LEN_FULL_NAME,
    )
    bio = models.TextField(
        max_length=MAX_LEN_BIO,
        null=True,
        blank=True
    )
    user = models.OneToOneField(
        UserModel,
        on_delete=models.RESTRICT
    )

    objects = ProfileManager()
