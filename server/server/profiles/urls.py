from django.urls import path, include

from server.profiles.views import ProfileDetailsView, UpdateProfilePictureView, RemoveProfilePictureView, \
    MyProfileDetailsView, MyProfileEditDetailsView

urlpatterns = [
    path('my-profile/', MyProfileDetailsView.as_view(), name='my profile details'),
    path('change-profile-picture/', UpdateProfilePictureView.as_view(), name='update profile pic'),
    path('remove-profile-picture/', RemoveProfilePictureView.as_view(), name='remove profile pic'),
    path('settings/', include([
        path('edit/', MyProfileEditDetailsView.as_view(), name='profile edit details'),
    ])),
    # path('edit/', MyProfileEditDetailsView.as_view(), name='profile edit details'),
    path('<str:user__username>/', ProfileDetailsView.as_view(), name='profile details'),
]
