# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set the working directory inside the container
WORKDIR /scripts

# Copy the SQL and shell script into the container
COPY run_init.sh /scripts/
COPY init_script.sql /scripts/