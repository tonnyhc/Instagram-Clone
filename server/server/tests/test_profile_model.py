import json

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase



class ProfileModelTest(APITestCase):
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
        response = self.client.post(self.url, json.dumps(self.data), content_type='application/json')
        self.user = get_user_model().objects.get(username=response.data['username'])

    def test_on_register_to_create_profile(self):
        profile = self.user.profile
        self.assertIsNotNone(profile)
        self.assertEqual(profile.full_name, self.data['full_name'])

