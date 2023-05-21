from django.contrib.auth import get_user_model
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase

from server.profiles.models import ProfileManager, Profile
from server.profiles.utils import get_default_profile_picture_path


class ProfileManagerTest(APITestCase):
    def setUp(self):
        self.manager = ProfileManager
        self.user = get_user_model().objects.create(
            username='test',
            password='testPass1234!',
            email="test@test.com"
        )
        self.full_name = 'Test Profile'
        self.profile = Profile.objects.create(
            full_name=self.full_name,
            user=self.user
        )

    def test_create_profile(self):
        self.assertEqual(self.profile.full_name, self.full_name)
        self.assertEqual(self.profile.user, self.user)

    def test_update_profile_picture(self):
        image_file = SimpleUploadedFile(
            name='test_image.jpeg',
            content=b'',
            content_type='image/jpeg'
        )

        Profile.objects.update_profile_picture(self.profile, picture=image_file)
        self.assertEqual(self.profile.profile_picture.name, 'profile-pictures/test_image.jpeg')
        default_storage.delete(self.profile.profile_picture.path)

    def test_remove_profile_picture(self):
        self.profile.profile_picture.name = 'profile-pictures/custom_profile_pic.jpg'
        self.profile.save()

        Profile.objects.remove_profile_picture(profile=self.profile)

        self.assertEqual(self.profile.profile_picture.name, get_default_profile_picture_path())