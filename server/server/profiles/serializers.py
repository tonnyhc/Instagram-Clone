from rest_framework import serializers


from server.profiles.models import Profile


class MyProfileDetailsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = Profile
        fields = ('profile_picture', 'full_name', 'username', 'id')


class ProfileDetailsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    followings = serializers.SerializerMethodField()
    friendship_status = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    def get_friendship_status(self, obj):
        request = self.context.get('request')
        if not request:
            print('return friendship')
            return
        follower_profile = Profile.objects.get(user=request.user)
        following_profile = self.context.get('profile')
        from server.followers.models import Follower
        follower_qs = Follower.objects.filter(follower=follower_profile, following=following_profile)
        return {
            'followed_by_viewer': follower_qs.exists()

        }

    def get_followers(self, obj):
        from server.followers.serializers import FollowerSerializer
        profile = self.context.get('profile')
        if not profile:
            print('return followers')
            return
        followers = profile.followers.all()
        serialized_followers = FollowerSerializer(followers, many=True).data
        return serialized_followers

    def get_followings(self, obj):
        from server.followers.serializers import FollowingSerializer
        from server.followers.models import Follower
        profile = self.context.get('profile')
        if not profile:
            print('return followings')
            return

        followings = Follower.objects.filter(follower=profile).all()
        print('followings')
        serialized_followings = FollowingSerializer(followings, many=True).data
        return serialized_followings


    class Meta:
        model = Profile
        fields = (
            'profile_picture', 'full_name', 'bio', 'username', 'followers', 'followings', 'id', 'friendship_status')
