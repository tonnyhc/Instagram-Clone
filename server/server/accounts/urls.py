from django.urls import path

from server.accounts.views import LoginView, RegisterView, ConfirmEmail

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('confirm-email/<str:email>/', ConfirmEmail.as_view(), name='confirm email'),
]