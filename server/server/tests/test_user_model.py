from django.contrib.auth import get_user_model
from django.test import TestCase

UserModel = get_user_model()


class AppUserModelTest(TestCase):

    def test_create_user(self):
        """Tests creating a new user"""
        email = 'test@test.com'
        username = "test"
        password = "testpass1234"

        user = UserModel.objects.create_user(
            email=email,
            username=username,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertEqual(user.username, username)
        self.assertTrue(user.check_password(password), password)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)

    def test_create_superuser(self):
        """Tests creating a superuser"""
        email = 'test@test.come'
        username = 'test'
        password = 'testpass1234'

        user = UserModel.objects.create_superuser(
            email=email,
            username=username,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertEqual(user.username, username)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
