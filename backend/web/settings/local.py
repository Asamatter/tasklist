from .base import *

DEBUG = True

ALLOWED_HOSTS += ['localhost']

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  
]

CORS_ALLOW_CREDENTIALS = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

