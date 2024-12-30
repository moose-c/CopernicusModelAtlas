# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set the working directory inside the container
WORKDIR /scripts

# Copy the SQL and shell script into the container
COPY run_init.sh /scripts/
COPY init_script.sql /scripts/

# # Ensure the shell script is executable
# RUN chmod +x /scripts/run_init.sh

# Default environment variables for PostgreSQL (change as needed)
ENV POSTGRES_PASSWORD=postgres

# # Optional: Automatically execute the run_init.sh script on container startup
# CMD ["/scripts/run_init.sh"]
