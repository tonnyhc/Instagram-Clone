import logging

from django.contrib.auth import get_user_model
from django.db import models, IntegrityError

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from rest_framework.exceptions import ValidationError


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)

        try:
            user.save(using=self._db)
        except IntegrityError:
            raise ValidationError('A user with this username/email already exists')
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

    def confirm_email(self, user, code):
        if not user:
            return False

        try:
            confirmation = user.confirmationcode_set.latest('created_at')
        except ConfirmationCode.DoesNotExist:
            return False

        if confirmation.code != code:
            return False

        user.is_confirmed = True
        user.save()
        confirmation.delete()
        return True


class AppUser(AbstractBaseUser, PermissionsMixin):
    MAX_LEN_USERNAME = 30
    MAX_LEN_FULL_NAME = 150

    email = models.EmailField(unique=True)
    username = models.CharField(
        max_length=MAX_LEN_USERNAME,
        unique=True
    )
    full_name = models.CharField(
        max_length=MAX_LEN_FULL_NAME
    )
    """
    is_active is false by default, because when the user is created, he need to enter the confirmation code
    and after that is_active is set to True and the user can log in
    """
    is_active = models.BooleanField(default=True)
    is_confirmed = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name='appuser_set',  # add related_name argument
        help_text=
        'The groups this user belongs to. A user will get all permissions '
        'granted to each of their groups.',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='appuser_set',  # add related_name argument
        help_text='Specific permissions for this user.',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


UserModel = get_user_model()


class ConfirmationCode(models.Model):
    MAX_LEN_CODE = 6
    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE
    )
    code = models.CharField(max_length=MAX_LEN_CODE)
    created_at = models.DateTimeField(auto_now_add=True)
