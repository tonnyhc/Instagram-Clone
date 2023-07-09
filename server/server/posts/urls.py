from django.urls import path

from server.posts.views import CreatePostView

urlpatterns = [
    path('create/', CreatePostView.as_view(), name='create post'),

]