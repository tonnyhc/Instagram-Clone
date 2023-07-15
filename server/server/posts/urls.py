from django.urls import path

from server.posts.views import CreatePostView, GetProfilePosts

urlpatterns = [
    path('get/<str:username>/', GetProfilePosts.as_view(), name='get profile posts'),
    path('create/', CreatePostView.as_view(), name='create post'),


]