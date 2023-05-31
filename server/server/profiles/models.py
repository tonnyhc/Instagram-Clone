from django.contrib.auth import get_user_model
from django.core.files.storage import default_storage

from django.db import models

from server.profiles.utils import get_default_profile_picture_path

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

    def update_profile_picture(self, profile, picture):
        if not picture:
            return
        if profile.profile_picture:
            default_storage.delete(profile.profile_picture.path)

        profile.profile_picture = picture
        profile.save()

    def remove_profile_picture(self, profile):
        if profile.profile_picture:
            default_storage.delete(profile.profile_picture.path)
            # profile.profile_picture = get_default_profile_picture_path()
            profile.profile_picture = None
        profile.save()

    def get_followers(self, profile):
        from server.followers.models import Follower
        if not profile:
            return

        followers_query = Follower.objects.filter(following=profile).all()
        """Getting the profile of the follower, because the serializer expects a profile"""
        followers = [follower.follower for follower in followers_query]
        return followers

    def get_followings(self, profile):
        from server.followers.models import Follower

        if not profile:
            return

        followings_query = Follower.objects.filter(follower=profile).all()
        """Getting the profile of the follower , because the serializer expects a profile"""
        followings = [following.following for following in followings_query]

        return followings




class Profile(models.Model):
    MAX_LEN_FULL_NAME = 150
    MAX_LEN_BIO = 250
    profile_picture = models.ImageField(
        upload_to='profile-pictures/',
        default=get_default_profile_picture_path()
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
