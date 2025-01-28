from common.utils import safe_get_env_var
import psycopg2
import base64
from flask import request, jsonify
import copy
import json

# Python dictionary equivalent of blankForm
blank_form_template = {
    "modelName": "",
    "keywords": [],
    "modellerName0": "",
    "modellerUrl0": "",
    "modellerName1": "",
    "modellerUrl1": "",
    "modellerName2": "",
    "modellerUrl2": "",
    "modellerName3": "",
    "modellerUrl3": "",
    "modellerName4": "",
    "modellerUrl4": "",
    "icon": "",
    "descr": "",
    "explanFig": "",
    "explanFigCaption": "",
    "linkName0": "",
    "linkUrl0": "",
    "linkName1": "",
    "linkUrl1": "",
    "linkName2": "",
    "linkUrl2": "",
    "linkName3": "",
    "linkUrl3": "",
    "linkName4": "",
    "linkUrl4": "",
    "theoryText": "",
    "theoryFig": "",
    "theoryFigDesc": "",
    "resText": "",
    "resFig": "",
    "resFigDesc": "",
    "boxTitle0": "",
    "boxFigTitle0": "",
    "boxfig0": "",
    "boxDescr0": "",
    "boxTitle1": "",
    "boxFigTitle1": "",
    "boxfig1": "",
    "boxDescr1": "",
    "boxTitle2": "",
    "boxFigTitle2": "",
    "boxfig2": "",
    "boxDescr2": "",
    "boxTitle3": "",
    "boxFigTitle3": "",
    "boxfig3": "",
    "boxDescr3": "",
    "methodsDesc": "",
    "methodsFile": "",
    "colofonCite": "",
    "colofonLicence": "",
    "colofonAddition": "",
}


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


def get_all_models():
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, modelname, modellername0, descr FROM models;")
    modelList = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(modelList)


def get_single_model(model_id):
    bytea_fields = [
        "icon",
        "explanFig",
        "theoryFig",
        "resFig",
        "methodsFile",
        "boxfig0",
        "boxfig1",
        "boxfig2",
        "boxfig3",
    ]

    keys = list(blank_form_template.keys())
    bytea_indexes = [keys.index(field) + 1 for field in bytea_fields if field in keys]

    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM models WHERE id = %s", [model_id])
    model = list(cur.fetchone())  # Fetch a single row
    for index in bytea_indexes:
        if model[index] != "":
            model[index] = base64.b64encode(model[index]).decode("utf-8")
    cur.close()
    conn.close()
    return jsonify(model)


def post_model():
    print("post model called")
    formData = copy.deepcopy(blank_form_template)
    try:
        # add non files to formData
        for key in list(request.form.keys()):
            if key == "keywords":
                formData[key] = json.loads(request.form.get(key))
            else:
                formData[key] = request.form.get(key)
        print(formData)

        # add files
        for key in list(request.files.keys()):
            file = request.files.get(key)
            file_data = psycopg2.Binary(file.read())
            formData[key] = file_data

        # create query
        columns = list(formData.keys())
        values = tuple(formData.values())
        placeholders = ", ".join(["%s"] * len(columns))
        query = f"INSERT INTO models ({', '.join(columns)}) VALUES ({placeholders})"

        # Execute the query
        conn = db_connection()
        cur = conn.cursor()
        cur.execute(query, values)
        conn.commit()

        cur.close()
        conn.close()

        print("Successfully posted to db")
        return (
            jsonify(
                {
                    "message": "Model added successfully",
                    "modelName": request.form.get("modelName"),
                }
            ),
            201,
        )

    except Exception as e:
        print(f"Failed to add model. Reason: {str(e)}")
        return jsonify({"error": "Failed to add model", "details": str(e)}), 400
