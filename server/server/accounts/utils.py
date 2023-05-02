import random
import string

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver

from server.accounts.models import ConfirmationCode

UserModel = get_user_model()


@receiver(post_save, sender=UserModel)
def send_confirmation_code(instance, created, **kwargs):
    # Generate a 6 digit code
    if created:
        code = ''.join(random.choices(string.digits, k=6))

        # Save the code to the db
        ConfirmationCode.objects.create(user=instance, code=code)

        subject = 'Confirm your email address!'
        message = f"Your confirmation code is: {code}"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]
        send_mail(subject, message, from_email, recipient_list)
