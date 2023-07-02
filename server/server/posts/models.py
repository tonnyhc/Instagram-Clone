from django.db import models

from server.profiles.models import Profile


class Post(models.Model):
    MAX_LEN_CAPTION = 500
    MAX_LEN_LOCATION = 80
    creator = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE
    )
    caption = models.CharField(
        max_length=MAX_LEN_CAPTION,
        blank=True,
        null=True
    )
    location = models.CharField(
        max_length=MAX_LEN_LOCATION,
        blank=True,
        null=True,
    )
    disabled_comments = models.BooleanField(
        default=False,

    )
    hidden_likes = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
