from rest_framework import serializers

from server.followers.models import Follower


class FollowingSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()

    def get_following(self, obj):
        from server.profiles.serializers import ProfileDetailsSerializer
        serializer = ProfileDetailsSerializer(obj.following)
        return serializer.data

    class Meta:
        model = Follower
        fields = ('following',)


class FollowerSerializer(serializers.ModelSerializer):
    follower = serializers.SerializerMethodField()

    def get_follower(self, obj):
        from server.profiles.serializers import ProfileDetailsSerializer
        serializer = ProfileDetailsSerializer(obj.follower)
        return serializer.data

    class Meta:
        model = Follower
        fields = ('follower',)
