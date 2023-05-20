import json

from django.contrib.auth import get_user_model
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
            'full_name': "Test Test",
            'password': 'testpass1234',
        }
        self.user_model = get_user_model()

    def test_register_with_valid_data(self):
        response = self.client.post(self.url, json.dumps(self.data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)
        self.assertIn('username', response.data)
        self.assertIn('email', response.data)

    def test_register_with_existing_email_and_username(self):
        self.client.post(self.url, json.dumps(self.data), content_type='application/json')

        response = self.client.post(self.url, json.dumps(self.data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0], 'app user with this email already exists.')
        self.assertEqual(response.data['username'][0], 'app user with this username already exists.')

    def test_on_register_to_send_conf_code(self):
        response = self.client.post(self.url, json.dumps(self.data), content_type='application/json')
        user = self.user_model.objects.get(username=response.data['username'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(user.confirmationcode_set.first())

    def test_on_register_to_create_profile(self):
        response = self.client.post(self.url, json.dumps(self.data), content_type='application/json')
        user = self.user_model.objects.get(username=response.data['username'])
        profile = user.profile
        self.assertIsNotNone(profile)


