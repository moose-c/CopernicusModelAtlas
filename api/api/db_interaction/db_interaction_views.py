from flask import Blueprint

from api.db_interaction.db_interaction_service import get_models, post_model

bp_name = "api-models"
bp_url_prefix = "/api/models"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/get")
def get():
    return get_models()


@bp.route("/post", methods=(["POST"]))
def post():
    return post_model()
