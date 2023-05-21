from rest_framework import serializers

from server.profiles.models import Profile


class ProfileDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('profile_picture', 'full_name', 'bio')



