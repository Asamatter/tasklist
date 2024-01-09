from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']


CORS_ALLOWED_ORIGINS = [
    "https://abject-question-production.up.railway.app",
]

DATABASE_URL = os.environ.get('DATABASE_URL')

DATABASES = {'default': dj_database_url.config(default=DATABASE_URL, engine='django.db.backends.postgresql')}

DATABASES = {
        'default': {            
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get("PGNAME"),
            'USER': os.environ.get("PGUSER"),
            'PASSWORD': os.environ.get("PGPASSWORD"),
            'HOST': os.environ.get("PGHOST", default='localhost'),  
            'PORT': os.environ.get("PGPORT"),
        }
    }

