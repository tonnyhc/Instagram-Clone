from django.urls import path

from server.followers.views import FollowProfile

urlpatterns = [
    path('follow/<int:pk>/', FollowProfile.as_view(), name='follow profile'),
]