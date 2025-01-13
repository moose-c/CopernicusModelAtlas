# Stage 1: Build stage
# Use a slim version of Python 3.9 for building and installing dependencies
FROM python:3.9.2-slim-buster@sha256:721de1d0aea3331da282531b8b9e428d552b89bd6fd0d0c14e634deaddc241fc as build

# Create a user group and user to avoid running as root inside the container
RUN groupadd auth0 && useradd -m developer -g auth0

# Set the working directory to a developer-friendly location
USER developer
WORKDIR /home/developer

# Copy the Python dependencies list into the container
COPY ./requirements.txt ./app/requirements.txt

# Install the Python dependencies in a target directory to bundle with the application
RUN pip install --disable-pip-version-check -r ./app/requirements.txt --target ./packages

# Copy application source files into the container
COPY ./api ./app/api
COPY ./common ./app/common
COPY ./gunicorn.conf.py ./app

# Stage 2: Production stage
# Use a minimal distroless image to run the application securely
FROM gcr.io/distroless/python3@sha256:eb773dd9d39f0becdab47e2ef5f1b10e2988c93a40ac8d32ca593096b409d351

# Copy the application and its packages from the build stage
COPY --from=build /home/developer/app /app
COPY --from=build /home/developer/packages /packages

# Set a non-root user to run the application securely
USER 1000

# Expose port 8080 for the web service
EXPOSE 8080/tcp

# Set Python's search path for imports
ENV PYTHONPATH="/packages"

# Set the working directory for the application
WORKDIR /app

# Start the application using Gunicorn
CMD ["/packages/gunicorn/app/wsgiapp.py","api.wsgi:app"]
