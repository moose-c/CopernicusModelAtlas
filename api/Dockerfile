FROM python:3.9.2-slim-buster as build

# Create user and group
RUN groupadd auth0 && useradd -m developer -g auth0
USER developer
WORKDIR /home/developer

# Copy and install dependencies
COPY ./requirements.txt ./app/requirements.txt
RUN pip install --disable-pip-version-check -r ./app/requirements.txt --target ./packages

# Copy application files
COPY ./api ./app/api
COPY ./common ./app/common
COPY ./gunicorn.conf.py ./app

FROM gcr.io/distroless/python3

# Copy files from build stage
COPY --from=build /home/developer/app /app
COPY --from=build /home/developer/packages /packages

# Ensure correct file permissions and ownership
RUN chown -R 1000:1000 /app /packages
USER 1000

# Expose port and set environment variables
EXPOSE 8080/tcp
ENV PYTHONPATH="/packages"

# Use Gunicorn to run the application
CMD ["gunicorn", "-c", "/app/gunicorn.conf.py", "api.wsgi:app"]
