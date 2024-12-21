# Stage 1: Build the Python environment
FROM python:3.9.2-slim-buster@sha256:721de1d0aea3331da282531b8b9e428d552b89bd6fd0d0c14e634deaddc241fc as build

# Create and switch to a non-root user
RUN groupadd auth0 && useradd -m developer -g auth0
USER developer
WORKDIR /home/developer

# Copy the requirements file and install dependencies
COPY ./requirements.txt ./app/requirements.txt
RUN pip install --disable-pip-version-check -r ./app/requirements.txt --target ./packages

# Copy the application code
COPY ./api ./app/api
COPY ./common ./app/common
COPY ./db_init.py ./app
COPY ./gunicorn.conf.py ./app

# Stage 2: Build the production image
FROM gcr.io/distroless/python3@sha256:eb773dd9d39f0becdab47e2ef5f1b10e2988c93a40ac8d32ca593096b409d351

# Copy the application and installed packages from the build stage
COPY --from=build /home/developer/app /app
COPY --from=build /home/developer/packages /packages

# Set the user for the container
USER 1000

# Expose the application port
EXPOSE 8080/tcp

# Set PYTHONPATH environment variable
ENV PYTHONPATH="/packages"

# Set the working directory
WORKDIR /app

# Run the database initialization script and then start the application
CMD ["bash", "-c", "python /app/db_init.py && /packages/gunicorn/app/wsgiapp.py api.wsgi:app"]
