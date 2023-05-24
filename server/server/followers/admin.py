from django.contrib import admin

from server.followers.models import Follower


@admin.register(Follower)
class FollowersAdmin(admin.ModelAdmin):
    pass
