from flask import Blueprint, request, jsonify

from api.db_interaction.db_interaction_service import (
    give_model_access,
    get_all_models,
    get_search_models,
    get_user_models,
    get_single_model,
    get_admin_info,
    post_model,
    edit_model,
    delete_model,
    approve_model,
    retrieve_data,
    send_new_email,
    change_page_moderators,
    change_page_moderator_email,
)

from api.auth.token_validation import introspect_token

bp_name = "api-models"
bp_url_prefix = "/api/models"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/get_admin_info")
def get_admin():
    return get_admin_info()


@bp.route("/get_all")
def get_all():
    bool = request.args.get("approved")
    return get_all_models(bool)


@bp.route("/search", methods=["GET"])
def search_models():
    if "text" in request.args:
        return get_search_models("searchBar", request.args.get("text"))

    if "keywords" in request.args:
        keywords = request.args.get("keywords").split(",")
        return get_search_models("keywords", keywords)

    return jsonify({"error": "query failed"}), 400


@bp.route("give_access/<model_name>/<user_id>")
def give_access(model_name, user_id):
    return give_model_access(model_name, user_id)


@bp.route("/send_email", methods=["POST"])
def send_email():
    return send_new_email()


@bp.route("/get_user/<user_id>")
def get_user(user_id):
    return get_user_models(user_id)


@bp.route("/get_single/<model_slug>")
def get_single(model_slug):
    return get_single_model(model_slug)


@bp.route("/get_file/<file_id>")
def get_data(file_id):
    return retrieve_data(file_id)


@bp.route("/edit/<model_slug>", methods=["DELETE", "POST"])
def edit(model_slug):
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        introspect_token(token)
        return edit_model(model_slug)

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/delete/<model_id>", methods=["DELETE"])
def delete(model_id):
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        introspect_token(token)
        return delete_model(model_id)

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/approve/<model_id>")
def approve(model_id):
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        introspect_token(token)
        return approve_model(model_id)

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/post", methods=(["POST"]))
def post():
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        introspect_token(token)
        return post_model()

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/change_moderators", methods=["POST"])
def change_moderators():
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        introspect_token(token)
        return change_page_moderators()

    except Exception as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/change_moderator_email", methods=["POST"])
def change_moderator_email():
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        introspect_token(token)
        return change_page_moderator_email()

    except Exception as e:
        return jsonify({"error": str(e)}), 401
