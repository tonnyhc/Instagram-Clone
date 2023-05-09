from django.contrib.auth import get_user_model, login, authenticate
from rest_framework import generics as rest_generic_views, views as rest_views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken import views as authtoken_views
from rest_framework.authtoken import models as authtoken_models
from rest_framework.response import Response

from server.accounts.serializers import LoginSerializer, RegisterSerializer
from server.accounts.utils import send_confirmation_code

UserModel = get_user_model()


class LoginView(authtoken_views.ObtainAuthToken):
    authentication_classes = ()
    serializer_class = LoginSerializer
    """This view requires CSRF_TOKEN"""

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = authtoken_models.Token.objects.get_or_create(user=user)

        return Response({
            'is_confirmed': user.is_confirmed,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email,
            'token': token.key,
        })


class RegisterView(rest_generic_views.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = RegisterSerializer
    # TODO: Write some tests
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        if user:
            login(request, user)
            token, created = authtoken_models.Token.objects.get_or_create(user=user)
            return Response({
                'is_confirmed': user.is_confirmed,
                'token': token.key,
                'user_id': user.pk,
                'username': user.username,
                'email': user.email,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfirmEmail(rest_views.APIView):

    def post(self, request, *args, **kwargs):
        code = request.data.get('code')
        email = kwargs.get('email')

        user = UserModel.objects.get(email=email)

        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        confirmation = UserModel.objects.confirm_email(user, code)
        if not confirmation:
            return Response({
                'message': "Failed to confirm"
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'message': "Email confirmed"
        }, status=status.HTTP_200_OK)


class LogoutView(rest_views.APIView):
    def get(self, request):
        return self.__perform_logout(request)

    def post(self, request):
        return self.__perform_logout(request)

    @staticmethod
    def __perform_logout(request):
        try:
            request.user.auth_token.delete()
            return Response({
                'message': 'User signed out'
            }, status=status.HTTP_200_OK)
        except AttributeError as e:
            return Response({
                'message': "No signed in user, cant perform sign-out!"
            }, status=status.HTTP_400_BAD_REQUEST)