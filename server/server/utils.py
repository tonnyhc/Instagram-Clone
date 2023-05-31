from django.conf import settings


def build_media_url_from_uri(request, uri):
    media_url = settings.MEDIA_URL.rstrip('/')
    return request.build_absolute_uri(f'{media_url}/{uri}')