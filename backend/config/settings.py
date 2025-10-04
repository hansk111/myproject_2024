from pathlib import Path
from os import getenv, path
from django.core.management.utils import get_random_secret_key
import dotenv
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

# development use local, production mode use prod
# dotenv_file = BASE_DIR / '.env.local'
dotenv_file = BASE_DIR / '.env.prod'

if path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)

DEVELOPMENT_MODE = getenv("DEVELOPMENT_MODE", "False")
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = getenv("DJANGO_SECRET_KEY", get_random_secret_key())

OPENAI_API_KEY = getenv("OPENAI_API_KEY", "False")

# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = getenv("DEBUG", "False")
DEVELOPMENT_MODE = getenv("DEVELOPMENT_MODE", "False")


ALLOWED_HOSTS = getenv("DJANGO_ALLOWED_HOSTS", "smarthan.store").split(",")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_simplejwt',
    'sslserver',
    'corsheaders',
    'rest_framework',
    # 'rest_framework_docs'
    'drf_yasg',
    'djoser',
    'social_django',
    'users',
    'posts',
    'api',
    'chat',
    'note',
    'weight',
    'todos',
    'bus',
    'video',
    'weather',

]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': getenv("SQL_ENGINE", "django.db.backends.sqlite3"),
        'NAME': getenv("SQL_DATABASE", path.join(BASE_DIR, 'db.sqlite3')),
        'USER': getenv("SQL_USER", "smarthan"),
        'PASSWORD': getenv("SQL_PASSWORD", "passwordpassword"),
        'HOST': getenv("SQL_HOST", "db"),
        'PORT': getenv("SQL_PORT", "5432"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

# if DEVELOPMENT_MODE is True:
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
# else:


AUTHENTICATION_BACKENDS = [
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.kakao.KakaoOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'users.authentication.CustomJWTAuthentication',  # frontend에서 접근할때
        # 'rest_framework.authentication.BasicAuthentication',  # backend에서 접근할때
        # 'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ]
}

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'auth/auth2/forgot-password/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'ACTIVATION_URL': 'activation/{uid}/{token}',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'TOKEN_MODEL': None,
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': getenv('REDIRECT_URLS').split(','),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "SLIDING_TOKEN_LIFETIME": timedelta(days=1),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=7),
}

AUTH_COOKIE = 'access'
AUTH_COOKIE_ACCESS_MAX_AGE = 60 * 60 * 24
AUTH_COOKIE_REFRESH_MAX_AGE = 60 * 60 * 24 * 7  # 24 hour
AUTH_COOKIE_SECURE = getenv('AUTH_COOKIE_SECURE', 'True') == 'True'
AUTH_COOKIE_HTTP_ONLY = True
AUTH_COOKIE_PATH = '/'
AUTH_COOKIE_SAMESITE = 'None'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = getenv("GOOGLE_AUTH_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = getenv("GOOGLE_AUTH_SECRET_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['first name', 'last_name']

SOCIAL_AUTH_FACEBOOK_KEY = getenv('FACEBOOK_AUTH_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET = getenv('FACEBOOK_AUTH_SECRET_KEY')
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'fields': 'email, first_name, last_name'
}

SOCIAL_AUTH_KAKAO_KEY = getenv('KAKAO_AUTH_KEY')
SOCIAL_AUTH_KAKAO_SECRET = getenv('KAKAO_AUTH_SECRET_KEY')
SOCIAL_AUTH_KAKAO_SCOPE = ['email']
SOCIAL_AUTH_KAKAO_PROFILE_EXTRA_PARAMS = {
    'fields': 'email, first_name, last_name'
}

CORS_ALLOWED_ORIGINS = getenv(
    'CORS_ALLOWED_ORIGINS',
    'https://localhost:3001,http://127.0.0.1:3000,https://127.0.0.1:3001,https://smarthan.store,http://127.0.0.1:8081,http://localhost:8081,file://'
).split(',')
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^null$",  # null origin 허용
    r"^file://.*$",  # file:// 스킴 허용
]
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CORS_ALLOWED_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
]

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.UserAccount'

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
DEFAULT_FROM_EMAIL = getenv("DEFAULT_FROM_EMAIL", "XXXXXXXXXXXXXXXXXXXXXXXX")
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# # 메일을 호스트하는 서버
# EMAIL_PORT = '587'
# # gmail과의 통신하는 포트
# EMAIL_HOST_USER = 'hanseokhee.han@gmail.com'
# # 발신할 이메일
# EMAIL_HOST_PASSWORD = getenv("EMAIL_HOST_PASSWORD", "aaa")
# # 발신할 메일의 비밀번호
# EMAIL_USE_TLS = True
# # TLS 보안 방법
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# # 사이트와 관련한 자동응답을 받을 이메일 주소

DOMAIN = getenv("DOMAIN", "XXXXXXXXXXXXXXXXXXXXX")
SITE_NAME = "SmartHAN"

SWAGGER_SETTINGS = {

    'LOGIN_URL': 'rest_framework:login',
    'LOGOUT_URL': 'rest_framework:logout'
}

DATA_UPLOAD_MAX_MEMORY_SIZE = 104857600    # 100MB
