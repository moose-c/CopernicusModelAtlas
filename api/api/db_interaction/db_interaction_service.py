from common.utils import safe_get_env_var
import psycopg2
from psycopg2.extras import RealDictCursor
import base64
from flask import request, jsonify
import copy
import json
import os

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
    "iconName": "",
    "longDescr": "",
    "explanFig": "",
    "explanFigName": "",
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
    "theoryFigName": "",
    "theoryFigDesc": "",
    "resText": "",
    "resFig": "",
    "resFigName": "",
    "resFigDesc": "",
    "boxTitle0": "",
    "boxFileTitle0": "",
    "boxDescr0": "",
    "boxTitle1": "",
    "boxFileTitle1": "",
    "boxDescr1": "",
    "boxTitle2": "",
    "boxFileTitle2": "",
    "boxDescr2": "",
    "boxTitle3": "",
    "boxFileTitle3": "",
    "boxDescr3": "",
    "methodsDesc": "",
    "colofonCite": "",
    "colofonLicence": "",
    "colofonAddition": "",
    "shortDescr": "",
    "nbModellers": 1,
    "nbLinks": 1,
    "nbBoxes": 1,
    "methodsFileCaption": "",
    "boxFile0": 0,
    "boxFile0Name": "",
    "boxFile1": 0,
    "boxFile1Name": "",
    "boxFile2": 0,
    "boxFile2Name": "",
    "boxFile3": 0,
    "boxFile3Name": "",
    "methodsFile": 0,
    "methodsFileName": "",
}


lo_fields = [
    "methodsFile",
    "boxFile0",
    "boxFile1",
    "boxFile2",
    "boxFile3",
]

bytea_fields = [
        "icon",
        "explanFig",
        "theoryFig",
        "resFig",
    ]


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
    cur.execute("SELECT id, modelname, modellername0, shortdescr FROM models;")
    modelList = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(modelList)


def get_single_model(model_id):

    conn = db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM models WHERE id = %s", [model_id])
    model = dict(cur.fetchone())  # Fetch a single row

    # Get images
    for key in bytea_fields:
        key = key.lower()
        if model[key] != None:
            model[key] = base64.b64encode(model[key]).decode("utf-8")

    # Get files
    for key in lo_fields:
        key = key.lower()
        if model[key] != None:
            lo_id = model[key]
            print(lo_id)
            model[key] = int(lo_id)
            # load and return
    cur.close()
    conn.close()
    return jsonify(model)


def delete_model(model_id):
    print("attempting to delete")
    conn = db_connection()
    cur = conn.cursor()
    try:
        # get lo's
        cur.execute(
            "SELECT methodsfile, boxfile0, boxfile1, boxfile2, boxfile3 FROM models WHERE id = %s",
            [model_id],
        )
        oldModel = list(cur.fetchone())  # Fetch a single row

        # delete lo's
        for loid in oldModel:
            if loid != 0:
                cur.execute("SELECT lo_unlink(%s);", (loid,))

        # delete model into models
        cur.execute("DELETE FROM models WHERE id = %s", (model_id,))
        conn.commit()

        print(f"Model with ID {model_id} deleted successfully.")
        return jsonify(f"Model with ID {model_id} deleted successfully.")

    except Exception as e:
        conn.rollback()
        print(f"Error deleting model with ID {model_id}: {e}")

    finally:
        cur.close()
        conn.close()


def post_model():

    print("post model called")
    print(request.form)
    formData = copy.deepcopy(blank_form_template)
    try:
        # add non files to formData
        for key in list(request.form.keys()):
            if key == "keywords":
                formData[key] = json.loads(request.form.get(key))
            
            # if you edit a model and resubmit it images are already in binary string format and not as file.
            # Better would be to decode it always in frontend on post.
            if key in bytea_fields:
                formData[key] = psycopg2.Binary(base64.b64decode(request.form.get(key)))
            else:
                formData[key] = request.form.get(key)

        # add files
        for key in list(request.files.keys()):
            if key in lo_fields:
                file = request.files.get(key)

                # Save file to temporarliy to not have it in ram.
                file_path = os.path.join("/tmp", file.filename)
                file.save(file_path)

                # save file path to refference later
                formData[key] = file_path

        # Setup db connection
        conn = db_connection()
        cur = conn.cursor()

        # upload large file objects
        for key in list(request.files.keys()):
            if key in lo_fields:
                cur.execute("SELECT lo_create(0);")
                lo_oid = cur.fetchone()[0]
                lo = conn.lobject(lo_oid, "w")
                with open(formData[key], "rb") as f:
                    lo.write(f.read())
                formData[key] = lo_oid

        # create query
        columns = formData.keys()
        values = tuple(formData.values())
        placeholders = ", ".join(["%s"] * len(columns))
        query = f"INSERT INTO models ({', '.join(columns)}) VALUES ({placeholders})"

        # insert model into models
        cur.execute(query, values)
        conn.commit()

        cur.close()
        conn.close()

        print(f"Succesfully posted {formData["modelName"]} to db")
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


def edit_model(model_id):
    print("edit model called")
    delete_model(model_id)
    post_model()
