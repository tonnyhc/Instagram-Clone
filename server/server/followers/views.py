from rest_framework import views, status
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
            return Response(
                FollowerSerializer(follower_object).data,
                status=status.HTTP_200_OK
            )
