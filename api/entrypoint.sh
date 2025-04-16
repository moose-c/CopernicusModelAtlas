#!/bin/bash

# Ensure directories are writable
mkdir -p /tmp/packages /api /common

# Install Python dependencies into /tmp/packages (a directory usually accessible by all users)
pip install --disable-pip-version-check -r /requirements.txt --target /tmp/packages

# Set the PYTHONPATH to point to the newly installed packages in /tmp
export PYTHONPATH=/tmp/packages

# Run the main application
python /tmp/packages/gunicorn/app/wsgiapp.py api.wsgi:app
