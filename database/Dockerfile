# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set the working directory inside the container
WORKDIR /scripts

# Copy the SQL and shell script into the container
COPY run_init.sh /scripts/
COPY init_script.sql /scripts/

# Copy the .env file into the container
COPY .env /scripts/.env

# Ensure the shell script is executable
RUN chmod +x /scripts/run_init.sh
