from common.utils import safe_get_env_var
import psycopg2
from flask import request, jsonify


def db_connection():
    conn = psycopg2.connect(
        dbname=safe_get_env_var("PGDATABASE"),
        user=safe_get_env_var("PGUSER"),
        password=safe_get_env_var("PGPASSWORD"),
        host=safe_get_env_var("PGHOST"),
        port=safe_get_env_var("PGPORT"),
        sslmode=safe_get_env_var("PGSSLMODE"),
    )
    return conn


def get_models():
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT model_name FROM models;")
    modelList = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(modelList)


def post_model():
    print("post model called")
    try:
        data = request.get_json()
        print(data)

        conn = db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO models (model_name) VALUES (%s)", (data["modelName"]))
        conn.commit()
        cur.close()
        conn.close()
        print("succesfully posted to db")

        return (
            jsonify(
                {"message": "Model added successfully", "modelName": data["modelName"]}
            ),
            201,
        )
    except Exception as e:
        print("out")
        return jsonify({"error": "Failed to add model", "details": str(e)}), 400
