from rest_framework import views, status, generics as rest_generic_views
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from server.followers.models import Follower
from server.followers.serializers import FollowerSerializer
from server.profiles.models import Profile


class FollowProfile(views.APIView):
    """
    If the request user does not follow the profile, it will follow
    Otherwise it will unfollow
    """

    def post(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            profile = Profile.objects.filter(pk=pk).get()
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if profile == request.user.profile:
            print('Tried to follow the request profile')
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            follow_object = Follower.objects.filter(follower=request.user.profile, following=profile).get()
            follow_object.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Follower.DoesNotExist:

            follower_object = Follower.objects.create(
                follower=request.user.profile,
                following=profile
            )

            follower_object.save()
            follower_profile = follower_object.follower
            return Response(
                FollowerSerializer(follower_profile).data,
                status=status.HTTP_200_OK
            )


class GetProfileFollowers(rest_generic_views.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

    # TODO: When have private profiles, modify this view so if the request user does not follow the profile to not return the followers
    def get(self, request, *args, **kwargs):
        profile_id = kwargs.get('pk')
        if not profile_id:
            return

        try:
            profile = Profile.objects.filter(pk=profile_id).get()
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        followers = Profile.objects.get_followers(profile)
        context = {
            'request': request
        }
        return Response(self.serializer_class(followers, many=True, context=context).data, status=status.HTTP_200_OK)


class GetProfileFollowings(rest_generic_views.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    def get(self, request, *args, **kwargs):
        profile_id = kwargs.get('pk')
        if not profile_id:
            return

        try:
            profile = Profile.objects.filter(pk=profile_id).get()
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        followings = Profile.objects.get_followings(profile)
        context = {
            'request': request
        }

        return Response(self.serializer_class(followings, many=True, context=context).data, status=status.HTTP_200_OK)
