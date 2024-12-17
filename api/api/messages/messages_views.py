from flask import Blueprint, jsonify

from api.messages.messages_service import (
    get_public_message,
    get_protected_message,
    get_admin_message,
)

from api.messages.get_models_service import get_models

from api.security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions,
)

bp_name = "api-messages"
bp_url_prefix = "/api/messages"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/models")
def models():
    return jsonify(get_models())


@bp.route("/public")
def public():
    return vars(get_public_message())


@bp.route("/protected")
@authorization_guard
def protected():
    return vars(get_protected_message())


@bp.route("/admin")
@authorization_guard
@permissions_guard([admin_messages_permissions.read])
def admin():
    return vars(get_admin_message())
