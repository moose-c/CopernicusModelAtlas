from common.utils import safe_get_env_var
import psycopg2

checkvariable = "hi"


def get_db_connection():
    conn = psycopg2.connect(
        host=safe_get_env_var("DB_HOST"),
        database="flask_db",
        user=safe_get_env_var("DB_USERNAME"),
        password=safe_get_env_var("DB_PASSWORD"),
    )
    return conn


def get_models():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT name, model FROM modellers;")
    modelList = cur.fetchall()
    cur.close()
    conn.close()
    modelList.append(checkvariable)
    return modelList
