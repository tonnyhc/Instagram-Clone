from django.contrib.auth import get_user_model
from django.forms import ImageField
from rest_framework import generics as rest_generic_views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import FileUploadParser, MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from server.profiles.models import Profile
from server.profiles.serializers import ProfileDetailsSerializer, MyProfileDetailsSerializer


class MyProfileDetailsView(rest_generic_views.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = MyProfileDetailsSerializer
    queryset = Profile.objects.all()

    def get(self, request, *args, **kwargs):
        user = request.user
        profile = Profile.objects.get(user=user)
        profile = self.serializer_class(profile, context={'request': request})
        return Response(profile.data, status=status.HTTP_200_OK)


class ProfileDetailsView(rest_generic_views.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileDetailsSerializer
    queryset = Profile.objects.all()
    lookup_field = 'user__username'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({
            'request': self.request,
            'profile': self.get_object()
        })
        return context

    def get(self, request, *args, **kwargs):
        username = kwargs.get('user__username')
        try:
            profile = self.get_queryset().get(user__username=username)
        except get_user_model().DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        context = self.get_serializer_context()

        serializer = self.get_serializer(profile, context=context)
        return Response(serializer.data)


class UpdateProfilePictureView(APIView):
    allowed_methods = ['POST']
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, JSONParser]

    # TODO: Fix the this so only the request user can change its own photo
    def post(self, request):
        image = ImageField()
        image = image.to_python(request.FILES.get('image'))
        if not image:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        profile_model = Profile
        profile = request.user.profile

        profile_model.objects.update_profile_picture(profile, image)
        media_url = request.build_absolute_uri(profile.profile_picture.url)
        return Response(data=media_url, status=status.HTTP_200_OK)


class RemoveProfilePictureView(APIView):
    allowed_methods = ['GET', 'POST']
    authentication_classes = [TokenAuthentication]

    # TODO: Fix the this so only the request user can change its own photo
    def post(self, request):
        user = request.user
        profile_model = Profile
        profile = user.profile

        profile_model.objects.remove_profile_picture(profile)
        media_url = request.build_absolute_uri(profile.profile_picture.url)
        return Response(data=media_url, status=status.HTTP_200_OK)
