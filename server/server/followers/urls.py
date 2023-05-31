from django.urls import path

from server.followers.views import FollowProfile, GetProfileFollowers, GetProfileFollowings

urlpatterns = [
    path('follow/<int:pk>/', FollowProfile.as_view(), name='follow profile'),
    path('get-followers/<int:pk>/', GetProfileFollowers.as_view(), name='get followers'),
    path('get-followings/<int:pk>/', GetProfileFollowings.as_view(), name='get followings')

]