from .base import *

DEBUG = False

STATIC_ROOT = BASE_DIR / "static"

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
