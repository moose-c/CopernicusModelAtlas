import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

user = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
print(user, password)

conn = psycopg2.connect(
    host="localhost",
    database="flask_db",
    user=user,
    password=os.getenv("DB_PASSWORD"),
)

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("DROP TABLE IF EXISTS modellers;")
cur.execute(
    "CREATE TABLE modellers (id serial PRIMARY KEY,"
    "name varchar (150) NOT NULL,"
    "model text,"
    "date_added date DEFAULT CURRENT_TIMESTAMP);"
)

# Insert data into the table

cur.execute(
    "INSERT INTO modellers (name, model)" "VALUES (%s, %s)",
    ("Oreane Edelenbosch", "Mimosa"),
)


cur.execute(
    "INSERT INTO modellers (name, model)" "VALUES (%s, %s)",
    ("Kees Goldewijk", "Hyde"),
)

conn.commit()

cur.close()
conn.close()
