from django.urls import path

from server.profiles.views import ProfileDetailsView, UpdateProfilePictureView, RemoveProfilePictureView

urlpatterns = [
    path('change-profile-picture/', UpdateProfilePictureView.as_view(), name='update profile pic'),
    path('remove-profile-picture/', RemoveProfilePictureView.as_view(), name='remove profile pic'),
    path('<str:username>/', ProfileDetailsView.as_view(), name='profile details'),

]