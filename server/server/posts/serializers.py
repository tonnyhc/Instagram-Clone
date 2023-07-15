from rest_framework import serializers

from server.posts.models import Post
from server.profiles.serializers import BaseProfileSerializer


class PostSerializer(serializers.ModelSerializer):
    media_files = serializers.SerializerMethodField()
    creator = serializers.SerializerMethodField()

    def get_media_files(self, obj):
        request = self.context.get('request')
        return [request.build_absolute_uri(media.media.url) for media in obj.postmedia_set.all()]
        # return [file.media.url for file in obj.postmedia_set.all()]

    def get_creator(self, obj):
        return BaseProfileSerializer(obj.creator).data

    class Meta:
        model = Post
        fields = ('creator', 'caption', 'location', 'disabled_comments', 'hidden_likes', 'created_at', 'media_files', 'id',)


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ('created_at', 'creator')