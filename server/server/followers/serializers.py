from rest_framework import serializers

from server.followers.models import Follower
from server.profiles.serializers import BaseProfileSerializer


class FollowerSerializer(BaseProfileSerializer):
    is_followed_by_viewer = serializers.SerializerMethodField()

    def get_profile(self, obj):
        return obj.follower

    def get_is_followed_by_viewer(self, obj):
        request = self.context.get('request')
        if not request:
            return

        request_profile = request.user.profile
        follower_profile = obj

        is_followed = Follower.objects.filter(following=follower_profile, follower=request_profile).exists()

        return is_followed
    profile_id = serializers.IntegerField(source='id')
    class Meta(BaseProfileSerializer.Meta):
        fields = ('profile_picture', 'username', 'full_name', 'profile_id', 'is_followed_by_viewer')
