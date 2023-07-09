from rest_framework import generics as rest_generic_views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from server.posts.models import PostMedia, Post
from server.posts.serializers import CreatePostSerializer, PostSerializer


class CreatePostView(rest_generic_views.CreateAPIView):
    serializer_class = CreatePostSerializer
    return_serializer_class = PostSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)

        creator = self.request.user.profile
        caption = serializer.validated_data['caption']
        location = serializer.validated_data['location']
        disabled_comments = serializer.validated_data['disabled_comments']
        hidden_likes = serializer.validated_data['hidden_likes']
        media_files = request.FILES.getlist('media')

        post_media_list = []

        for media_file in media_files:
            post_media = PostMedia(
                media=media_file,
                creator=creator
            )
            post_media_list.append(post_media)

        post = Post.objects.create_post(creator, caption, location, disabled_comments, hidden_likes, media_files)
        serialized_post = self.return_serializer_class(post).data
        return Response(serialized_post, status=status.HTTP_201_CREATED)
