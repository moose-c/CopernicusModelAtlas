vanuit dockercompose:
# Service for the timeseries database
timeseries-database:
    container_name: timeseries-database

    user: postgres # Specify the user as 'postgres'

    image: postgres:15-alpine # Use the specified PostgreSQL image

    env_file:
      - ./.env # File containing postgress password

    environment:
      DEBUG: 0
      POSTGRES_DB: timeseries
    
    ports:
      - 5432:5432

    healthcheck:
      # Check PostgreSQL availability
      test: [ "CMD-SHELL", "pg_isready" ]
      interval: 10s
      retries: 5