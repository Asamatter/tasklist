from .base import *
import dj_database_url

DEBUG = False

STATIC_ROOT = BASE_DIR / "static"

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
