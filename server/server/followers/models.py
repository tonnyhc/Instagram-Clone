from django.db import models


class Follower(models.Model):
    follower = models.ForeignKey(
        'profiles.Profile',
        related_name='following',
        on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        'profiles.Profile',
        related_name='followers',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

