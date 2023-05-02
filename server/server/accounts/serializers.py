from django.contrib.auth import authenticate, get_user_model, password_validation
from django.core import exceptions
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

UserModel = get_user_model()


class LoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = UserModel
        fields = ('__all__')

    def validate(self, attrs):
        email_or_username = attrs.get('email_or_username')
        password = attrs.get('password')

        if "@" in email_or_username:
            user = authenticate(request=self.context['request'], email=email_or_username, password=password)
        else:
            user = authenticate(request=self.context['request'], username=email_or_username, password=password)

        if not user:
            raise serializers.ValidationError('Invalid email/username or password')

        attrs['user'] = user
        return attrs


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username', 'full_name', 'password')

    def create(self, validated_data):
        user_manager = UserModel.objects

        username = validated_data['username']
        email = validated_data['email']
        full_name = validated_data['full_name']
        password = validated_data['password']

        user = user_manager.create_user(
            email=email,
            username=username,
            full_name=full_name,
            password=password,
        )

        return user

    def validate(self, data):
        user = UserModel
        password = data.get('password')
        errors = {}
        try:
            password_validation.validate_password(password, user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)

    def to_representation(self, instance):
        user_representation = super().to_representation(instance)
        user_representation.pop('password')
        return user_representation
