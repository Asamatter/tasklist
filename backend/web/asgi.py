"""
ASGI config for web project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application


def get_settings_module():
    environment = os.environ.get('DJANGO_ENVIRONMENT')

    if environment == 'prod':
        return 'web.settings.production'
    else:
        return 'web.settings.local'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', get_settings_module())

application = get_asgi_application()
