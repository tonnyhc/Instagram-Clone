from django.db import models

from server.profiles.models import Profile


class PostManager(models.Manager):
    def create_post(self, creator, caption, location, disabled_comments, hidden_likes, media_files):
        post = self.model(
            creator=creator,
            caption=caption,
            location=location,
            disabled_comments=disabled_comments,
            hidden_likes=hidden_likes,
        )
        post.save()

        for media in media_files:
            post_media = PostMedia(
                media=media,
                creator=creator,
                post=post
            )
            post_media.save()

        return post

    def get_posts_for_profile(self, profile):
        return self.filter(creator=profile).order_by('-created_at')

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

    objects = PostManager()


class PostMedia(models.Model):
    media = models.FileField(upload_to='posts')
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE
    )
