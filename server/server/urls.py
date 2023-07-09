from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('accounts/', include('server.accounts.urls')),
        path('profiles/', include('server.profiles.urls')),
        path('followers/', include('server.followers.urls')),
        path('posts/', include('server.posts.urls'))
    ])),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
