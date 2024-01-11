from .base import *
import dj_database_url

DEBUG = False

STATIC_ROOT = BASE_DIR / "static"

DATABASES = {
        'default': {            
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get("PGNAME"),
            'USER': os.environ.get("PGUSER"),
            'PASSWORD': os.environ.get("PGPASSWORD"),
            'HOST': os.environ.get("PGHOST"),  
            'PORT': os.environ.get("PGPORT"),
        }
    }
