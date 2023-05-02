from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient


class TestRegisterView(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('register')
        self.data = {
            "username": 'test',
            'email': 'test@test.com',
            'full_name': "Test User",
            'password': 'testpass1234',
        }

    def test_register_with_valid_data(self):

        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)
        self.assertIn('username', response.data)
        self.assertIn('email', response.data)

    def test_register_with_existing_email_and_username(self):
        self.client.post(self.url, self.data)

        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0], 'app user with this email already exists.')
        self.assertEqual(response.data['username'][0], 'app user with this username already exists.')
