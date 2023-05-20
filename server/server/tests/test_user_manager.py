from django.test import TestCase
from django.contrib.auth import get_user_model

class CustomUserManagerTestCase(TestCase):
    def setUp(self):
        self.User = get_user_model()
        self.user_manager = get_user_model().objects

    def test_create_user(self):
        email = 'test@example.com'
        password = 'testpassword'
        user = self.user_manager.create_user(email=email, password=password)

        # check that the user was created with the correct email
        self.assertEqual(user.email, email)
        # check that the user was created with the correct password
        self.assertTrue(user.check_password(password))
        # check that the user is not a superuser
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        email = 'test@example.com'
        password = 'testpassword'
        user = self.user_manager.create_superuser(email=email, password=password)

        # check that the user was created with the correct email
        self.assertEqual(user.email, email)
        # check that the user was created with the correct password
        self.assertTrue(user.check_password(password))
        # check that the user is a superuser
        self.assertTrue(user.is_superuser)

    def test_create_user_without_email(self):
        email = None
        password = ''
        with self.assertRaises(ValueError):
            self.user_manager.create_user(email, password)
