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
        sslmode="require",
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
        cur.execute(
            "INSERT INTO models VALUES ({})'.format(', '.join('%s' for s in range(9)))",
            (
                data["modelName"],
                data["keywords"],
                data["modellers"][0]["name"],
                data["modellers"][0]["url"],
                data["icon"],
                data["descr"],
                data["explanFig"],
                data["links"][0]["buttonText"],
                data["links"][0]["url"],
            ),
        )
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
        print(f"failed to add model. reason: {str(e)}")
        return jsonify({"error": "Failed to add model", "details": str(e)}), 400
