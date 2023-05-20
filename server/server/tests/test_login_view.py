import json

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class TestLoginView(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('login')
        email = 'test@test.com'
        password = 'testpass1234'
        username = 'test'
        self.user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )

    def test_login_with_valid_credentials(self):
        data = {
            'email_or_username': "test@test.com",
            'password': 'testpass1234'
        }
        response = self.client.post(self.url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user_id', response.data)
        self.assertIn('username', response.data)
        self.assertIn('email', response.data)
        self.assertIn('token', response.data)