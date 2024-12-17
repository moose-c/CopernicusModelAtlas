import os
import gunicorn.http.wsgi
from functools import wraps
from common.utils import safe_get_env_var


# WSGI application
wsgi_app = "api.wsgi:app"

# Server binding
PORT = safe_get_env_var("PORT")  # Default to 8080 if PORT is not set
bind = f"0.0.0.0:{PORT}"


# Security: Remove 'Server' header from responses
def wrap_default_headers(func):
    @wraps(func)
    def default_headers(*args, **kwargs):
        return [
            header
            for header in func(*args, **kwargs)
            if not header.startswith("Server: ")
        ]

    return default_headers


gunicorn.http.wsgi.Response.default_headers = wrap_default_headers(
    gunicorn.http.wsgi.Response.default_headers
)

# Performance tuning
workers = int(os.getenv("GUNICORN_WORKERS", "3"))  # Default to 3 workers
worker_class = os.getenv(
    "GUNICORN_WORKER_CLASS", "sync"
)  # Default to synchronous workers
timeout = int(os.getenv("GUNICORN_TIMEOUT", "30"))  # Default timeout

# Logging
accesslog = "-"  # Log access logs to stdout
errorlog = "-"  # Log errors to stderr
loglevel = os.getenv("GUNICORN_LOGLEVEL", "info")  # Default log level
