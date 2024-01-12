from .base import *
import dj_database_url

DEBUG = False

STATIC_ROOT = BASE_DIR / "static"

DATABASE_URL = os.environ.get('DATABASE_URL')

DATABASES = {'default': dj_database_url.config(default=DATABASE_URL, engine='django.db.backends.postgresql')}
