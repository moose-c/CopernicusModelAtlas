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
        columns = [
            "model_name",
            "keywords",
            "modeller_name",
            "modeller_url",
            "icon",
            "descr",
            "explanation_figure",
            "button_text",
            "button_url",
        ]

        # Create a string with the correct number of placeholders (%s)
        placeholders = ", ".join(["%s"] * len(columns))

        # Prepare the values in the same order as the columns
        values = (
            data["modelName"],
            data["keywords"][0],
            data["modellers"][0]["name"],
            data["modellers"][0]["url"],
            data["icon"],
            data["descr"],
            data["explanFig"],
            data["links"][0]["buttonText"],
            data["links"][0]["url"],
        )

        conn = db_connection()
        cur = conn.cursor()
        # Define the columns and data dynamically

        # Create the dynamic query
        query = f"INSERT INTO models ({', '.join(columns)}) VALUES ({placeholders})"

        # Execute the query with the data values
        cur.execute(query, values)

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
