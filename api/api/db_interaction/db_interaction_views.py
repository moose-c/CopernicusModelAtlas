from flask import Blueprint, jsonify

from api.db_interaction.get_models_service import get_models

from api.security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions,
)

bp_name = "api-models"
bp_url_prefix = "/api/models"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/get")
def models():
    return jsonify(get_models())
