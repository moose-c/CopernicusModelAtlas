from flask import Blueprint

from api.db_interaction.db_interaction_service import (
    get_all_models,
    get_single_model,
    post_model,
    edit_model,
    delete_model,
)

bp_name = "api-models"
bp_url_prefix = "/api/models"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/get_all")
def get_all():
    return get_all_models()


@bp.route("/get_single/<model_id>")
def get_single(model_id):
    return get_single_model(model_id)


@bp.route("/edit/<model_id>")
def edit(model_id):
    return edit_model(model_id)


@bp.route("/delete/<model_id>", methods=["DELETE"])
def delete(model_id):
    return delete_model(model_id)


@bp.route("/post", methods=(["POST"]))
def post():
    return post_model()
