from common.utils import safe_get_env_var
import psycopg2
from flask import request, jsonify


def db_connection():
    conn = psycopg2.connect(
        host=safe_get_env_var("DB_HOST"),
        database="flask_db",
        user=safe_get_env_var("DB_USERNAME"),
        password=safe_get_env_var("DB_PASSWORD"),
    )
    return conn


def get_models():
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT name, model FROM modellers;")
    modelList = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(modelList)


def post_model():
    try:
        data = request.get_json()
        name = data["name"]
        model = data["model"]
        print("inside")

        conn = db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO modellers (name, model) VALUES (%s, %s)", (name, model)
        )
        conn.commit()
        cur.close()
        conn.close()

        return (
            jsonify(
                {"message": "Model added successfully", "name": name, "model": model}
            ),
            201,
        )
    except Exception as e:
        print("out")
        return jsonify({"error": "Failed to add model", "details": str(e)}), 400
