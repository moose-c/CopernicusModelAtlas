import psycopg2
from psycopg2.extras import RealDictCursor
import base64
from flask import request, jsonify, Response
import copy
import json
import os
from dotenv import load_dotenv
from api.send_email.send_email import (
    send_email,
)

# Load environment variables from .env file
load_dotenv()

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
    "uuUser": "",
    "isApproved": False,
    "boxFile0Bar": False,
    "boxFile1Bar": False,
    "boxFile2Bar": False,
    "boxFile3Bar": False,
    "methodsFileBar": False,
    "boxTitle4": "",
    "boxFileTitle4": "",
    "boxDescr4": "",
    "boxFile4": 0,
    "boxFile4Name": "",
    "boxFile4Bar": False,
    "boxTitle5": "",
    "boxFileTitle5": "",
    "boxDescr5": "",
    "boxFile5": 0,
    "boxFile5Name": "",
    "boxFile5Bar": False,
    "boxTitle6": "",
    "boxFileTitle6": "",
    "boxDescr6": "",
    "boxFile6": 0,
    "boxFile6Name": "",
    "boxFile6Bar": False,
    "boxTitle7": "",
    "boxFileTitle7": "",
    "boxDescr7": "",
    "boxFile7": 0,
    "boxFile7Name": "",
    "boxFile7Bar": False,
}


lo_fields = [
    "methodsFile",
    "boxFile0",
    "boxFile1",
    "boxFile2",
    "boxFile3",
    "boxFile4",
    "boxFile5",
    "boxFile6",
    "boxFile7",
]

bytea_fields = [
    "icon",
    "explanFig",
    "theoryFig",
    "resFig",
]


def db_connection():
    conn = psycopg2.connect(
        dbname=os.getenv("PGDATABASE"),
        user=os.getenv("PGUSER"),
        password=os.getenv("PGPASSWORD"),
        host=os.getenv("PGHOST"),
        port=os.getenv("PGPORT"),
        sslmode="require",
    )
    return conn


def get_admin_info():
    try:
        conn = db_connection()
        cur = conn.cursor()
        cur.execute("SELECT moderator_ids, moderator_email FROM moderators;")
        moderatorInfo = cur.fetchall()

        cur.close()
        conn.close()
        return jsonify(moderatorInfo)
    except Exception as e:
        print("getting moderator info not succeeded: ", e)


def get_all_models(bool):
    conn = db_connection()
    cur = conn.cursor()
    print(bool)
    if bool == "true":
        cur.execute(
            f"SELECT id, modelname, keywords, modellername0, modellername1, modellername2, modellername3, modellername4, shortdescr, icon, isapproved FROM models WHERE isapproved = true;"
        )
    else:
        print("geting all")
        cur.execute(
            f"SELECT id, modelname, keywords, modellername0, modellername1, modellername2, modellername3, modellername4, shortdescr, icon, isapproved FROM models;"
        )
    modelList = cur.fetchall()

    # modify the obtained icons
    for i, row in enumerate(modelList):
        modelList[i] = list(modelList[i])

        # decode the icon
        modelList[i][9] = base64.b64encode(row[9]).decode("utf-8")

    cur.close()
    conn.close()
    return jsonify(modelList)


def get_search_models(searchType, searchValue):
    conn = db_connection()
    cur = conn.cursor()

    try:
        if searchValue in ["", [""]]:
            cur.execute(
                "SELECT id, modelname, keywords, modellername0, modellername1, modellername2, modellername3, modellername4, shortdescr, icon FROM models WHERE isapproved = true;"
            )
        elif searchType == "searchBar":
            cur.execute(
                """
                SELECT id, modelname, keywords, modellername0, modellername1, modellername2, modellername3, modellername4, shortdescr, icon
                FROM models 
                WHERE (modelname ILIKE %s OR shortdescr ILIKE %s) 
                AND isapproved = true;
                """,
                (
                    "%" + searchValue + "%",
                    "%" + searchValue + "%",
                ),
            )
        elif searchType == "keywords":
            formatted_keywords = (
                "{" + ",".join([f'"{keyword}"' for keyword in searchValue]) + "}"
            )
            print(formatted_keywords)
            cur.execute(
                """
                SELECT id, modelname, keywords, modellername0, modellername1, modellername2, modellername3, modellername4, shortdescr, icon, isapproved 
                FROM models
                WHERE keywords && %s AND isapproved = true;  
                """,
                (formatted_keywords,),
            )

        modelList = cur.fetchall()

    except Exception as e:
        conn.rollback()
        print(f"Error getting search models: {e}")

    finally:
        cur.close()
        conn.close()

    # modify the obtained icons
    for i, row in enumerate(modelList):
        modelList[i] = list(modelList[i])

        # decode the icon
        modelList[i][9] = base64.b64encode(row[9]).decode("utf-8")

    return jsonify(modelList)


def get_user_models(user_id):
    try:
        conn = db_connection()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, modelname, keywords, modellername0, modellername1, modellername2, modellername3, modellername4, shortdescr, icon, isapproved FROM models WHERE uuUser = %s;",
            [user_id],
        )
        modelList = cur.fetchall()

        # modify the obtained icons
        for i, row in enumerate(modelList):
            modelList[i] = list(modelList[i])
            modelList[i][9] = base64.b64encode(row[9]).decode("utf-8")

        cur.close()
        conn.close()
        return jsonify(modelList)
    except Exception as e:
        print("getting user models not succeeded: ", e)


def get_single_model(model_slug):
    model_name = model_slug.replace("_", " ")
    conn = db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM models WHERE modelname = %s", [model_name])
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

            model[key] = int(lo_id)
            # load and return
    cur.close()
    conn.close()
    return jsonify(model)


def delete_model(model_id, los_to_delete=[]):
    print("attempting to delete")
    conn = db_connection()
    cur = conn.cursor()
    try:
        for loid in los_to_delete:
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


def send_new_email():
    try:
        print("attempting to send email")
        subject = request.form.get("subject")
        html = request.form.get("html")

        email = send_email(subject, html)
        return jsonify("succesfully send the following email", email)

    except Exception as e:
        print("couldn't send email", e)


def change_page_moderators():
    try:
        moderatorId = request.form.get("moderatorId")
        conn = db_connection()
        cur = conn.cursor()
        # check
        cur.execute("SELECT moderator_ids FROM moderators")
        moderatorIds = cur.fetchall()[0][0]
        print(moderatorIds)
        if moderatorId in moderatorIds:
            moderatorIds.remove(moderatorId)
        else:
            moderatorIds.append(moderatorId)
        print(moderatorIds)
        cur.execute(
            """
            UPDATE moderators 
            SET moderator_ids = %s;
        """,
            (moderatorIds,),
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(f"Model succesfully changed owner.")

    except Exception as e:
        print("couldn't send email", e)


def change_page_moderator_email():
    try:
        moderatorEmail = request.form.get("moderatorEmail")
        conn = db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            UPDATE moderators 
            SET moderator_email = %s;
        """,
            (moderatorEmail,),
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(f"Model succesfully changed owner.")

    except Exception as e:
        print("couldn't send email", e)


def give_model_access(model_name, user_id):
    try:
        print("attempting to give model access")
        conn = db_connection()
        cur = conn.cursor()

        cur.execute(
            "UPDATE models SET uuUser = %s WHERE modelname = %s",
            (user_id, model_name),
        )

        conn.commit()
        cur.close()
        conn.close()
        return jsonify(f"Model succesfully changed owner.")
    except Exception as e:
        print("error changing owner", e)


def approve_model(model_id):
    print("attempting to approve")
    conn = db_connection()
    cur = conn.cursor()
    try:

        cur.execute(
            "UPDATE models SET isApproved = NOT isApproved WHERE id = %s", (model_id,)
        )
        conn.commit()

        print(f"Model with ID {model_id} apprvoed successfully.")
        return jsonify(f"Model with ID {model_id} approved successfully.")

    except Exception as e:
        conn.rollback()
        print(f"Error approving model with ID {model_id}: {e}")

    finally:
        cur.close()
        conn.close()


def post_model(edit=False):
    print("post model called")
    formData = copy.deepcopy(blank_form_template)

    # add non files to formData
    for key in list(request.form.keys()):
        if key == "keywords":
            formData[key] = json.loads(request.form.get(key))
        # if you edit a model and resubmit it images are already in binary string format and not as file.
        elif key in bytea_fields:
            formData[key] = psycopg2.Binary(base64.b64decode(request.form.get(key)))
        else:
            formData[key] = request.form.get(key)

    try:
        # check if a unique model name
        model_name = formData["modelName"]
        print(model_name)
        conn = db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT id FROM models WHERE modelname = %s",
            (model_name,),
        )

        result = cur.fetchall()

        if not edit:
            if len(result) != 0:
                raise Exception("There is already a model with this name!")
        else:
            if len(result) not in [0, 1]:
                # either changed or equal.
                raise Exception(
                    "There is already a model (beside the one currently editing) with this name!"
                )

        conn.commit()
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Model Name uniqueness string failed! Reason: {str(e)}")
        raise

    try:
        # Upload large file objects directly to the database
        # Setup db connection
        conn = db_connection()
        cur = conn.cursor()

        # can be further improved by using asynchronous uploading (e.g. Celery) or external storage Services (S3)
        for key in list(request.files.keys()):
            if key in lo_fields:
                file = request.files.get(key)

                cur.execute("SELECT lo_create(0);")
                lo_oid = cur.fetchone()[0]
                lo = conn.lobject(lo_oid, "w")

                # Stream the file from the request directly into the large object
                with file.stream as f:
                    while chunk := f.read(1024 * 1024):  # Read 1MB at a time
                        lo.write(chunk)

                # Save the LO OID for later reference
                formData[key] = lo_oid

    except Exception as e:
        print(f"Failed to add lo's to db. Reason: {str(e)}")
        raise

    try:
        # upload to models table
        columns = list(formData.keys())
        values = tuple(formData.values())
        placeholders = ", ".join(["%s"] * len(columns))

        if "id" in columns:
            # this means that we are editing an existing model
            cur.execute("SELECT nextval('models_id_seq');")
            next_id = cur.fetchone()[0]
            values = values[:-1] + (next_id,)

        query = f"INSERT INTO models ({', '.join(columns)}) VALUES ({placeholders})"

        # insert model into models
        cur.execute(query, values)
        conn.commit()

        cur.close()
        conn.close()

    except Exception as e:
        print(f"Failed to add entry to models. Reason: {str(e)}")
        raise

    print(f"Succesfully posted {formData['modelName']} to db")
    return (
        jsonify(
            {
                "message": "Model added successfully",
                "modelName": request.form.get("modelName"),
            }
        ),
        201,
    )


def edit_model(model_slug):
    print("edit model called")

    model_name = model_slug.replace("_", " ")

    # get id of previous entry
    try:
        conn = db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT id FROM models WHERE modelname = %s",
            (model_name,),
        )

        result = cur.fetchone()
        old_id = int(result[0])

        conn.commit()
        cur.close()
        conn.close()

    except Exception as e:
        print("getting the id of the old model failed", e)
        return

    try:
        post_model(True)
        print("adding went succesfully")

    except Exception as e:
        print("do not delete model if you can't add a new one")
        return

    try:
        # Need to learn which lo's to delete
        los_to_delete = []
        newValues = []
        for key in lo_fields:
            # if already put in the database, the request.form.get gives the loid
            try:
                newValue = int(request.form.get(key))
                newValues.append(newValue)
            except:
                newValues.append(-1)

        conn = db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT methodsfile, boxfile0, boxfile1, boxfile2, boxfile3, boxfile4, boxfile5, boxfile6, boxfile7 FROM models WHERE id = %s",
            [old_id],
        )
        oldValues = list(cur.fetchone())  # Fetch a single row

        conn.commit()
        cur.close()
        conn.close()

        for i, oldValue in enumerate(oldValues):
            if oldValue not in newValues:
                los_to_delete.append(oldValue)

        delete_model(old_id, los_to_delete=los_to_delete)
        print("deleting went succesfully")
        return (
            jsonify(
                {
                    "message": "Model edited successfully",
                    "modelName": request.form.get("modelName"),
                }
            ),
            201,
        )
    except Exception as e:
        print(f"Failed to add model. Reason: {str(e)}")
        return jsonify({"error": "Failed to add model", "details": str(e)}), 400


def generate_large_object(data_loid, chunk_size=1024 * 1024):
    conn = db_connection()
    cur = conn.cursor()

    # Stream the object in chunks
    lo = conn.lobject(int(data_loid), "rb")
    while True:
        chunk = lo.read(chunk_size)
        if not chunk:
            break
        yield chunk

    # Close large object
    lo.close()

    cur.close()
    conn.close()


def retrieve_data(data_loid):
    try:
        return Response(
            generate_large_object(data_loid), mimetype="application/octet-stream"
        )

    except Exception as e:
        jsonify({"error": "Error retrieving file", "details": str(e)}), 500
