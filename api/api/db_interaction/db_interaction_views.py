from flask import Blueprint, request, jsonify

from api.db_interaction.db_interaction_service import (
    get_all_models,
    get_user_models,
    get_single_model,
    post_model,
    edit_model,
    delete_model,
    approve_model,
    retrieve_data,
)

from api.auth.jwt_validation import verify_jwt

bp_name = "api-models"
bp_url_prefix = "/api/models"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/get_all")
def get_all():
    return get_all_models()


@bp.route("/get_user/<user_id>")
def get_user(user_id):
    return get_user_models(user_id)


@bp.route("/get_single/<model_id>")
def get_single(model_id):
    return get_single_model(model_id)


@bp.route("/get_file/<file_id>")
def get_data(file_id):
    return retrieve_data(file_id)


@bp.route("/edit/<model_id>", methods=["DELETE", "POST"])
def edit(model_id):
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        verify_jwt(token)
        return edit_model(model_id)

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/delete/<model_id>", methods=["DELETE"])
def delete(model_id):
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        verify_jwt(token)
        return delete_model(model_id)

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/approve/<model_id>")
def approve(model_id):
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        verify_jwt(token)
        return approve_model(model_id)

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/post", methods=(["POST"]))
def post():
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        verify_jwt(token)
        return post_model()

    except Exception as e:
        return jsonify({"error": str(e)}), 401
