from rest_framework import serializers

from server.profiles.models import Profile


class ProfileDetailsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username
    class Meta:
        model = Profile
        fields = ('profile_picture', 'full_name', 'bio', 'username')



