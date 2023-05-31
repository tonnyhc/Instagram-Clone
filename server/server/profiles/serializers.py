from django.conf import settings
from rest_framework import serializers

from server.profiles.models import Profile


class BaseProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = Profile
        fields = ('profile_picture', 'full_name', 'username', 'id')


class ProfileDetailsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    followings_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    friendship_status = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()
    is_profile_owner = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    def get_profile_picture(self, obj):
        media_url = settings.MEDIA_URL.rstrip('/')
        profile_picture_path = obj.profile_picture
        request = self.context.get('request')
        if not profile_picture_path:
            return
        if not request:
            return
        return request.build_absolute_uri(f'{media_url}/{profile_picture_path}')

    def get_friendship_status(self, obj):
        request = self.context.get('request')
        if not request:
            return
        follower_profile = Profile.objects.get(user=request.user)
        following_profile = self.context.get('profile')
        from server.followers.models import Follower
        follower_qs = Follower.objects.filter(follower=follower_profile, following=following_profile)
        return {
            'followed_by_viewer': follower_qs.exists()

        }

    def get_followers_count(self, obj):
        profile = self.context.get('profile')
        if not profile:
            return

        followers_count = profile.followers.count()
        return followers_count

    def get_followings_count(self, obj):
        from server.followers.models import Follower
        profile = self.context.get('profile')
        if not profile:
            return

        followings_count = Follower.objects.filter(follower=profile).count()
        return followings_count

    def get_is_profile_owner(self, obj):
        request = self.context.get('request')
        profile = obj
        if not request:
            return
        return profile == request.user.profile


    class Meta:
        model = Profile
        fields = (
            'profile_picture', 'full_name', 'bio', 'username', 'followers_count', 'followings_count', 'id',
            'friendship_status', 'is_profile_owner', )
