from flask import Blueprint, jsonify, request

from api.messages.messages_service import (
    get_public_message,
    get_protected_message,
    get_admin_message,
)

from api.auth.jwt_validation import verify_jwt

bp_name = "api-messages"
bp_url_prefix = "/api/messages"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/public")
def public():
    return vars(get_public_message())


@bp.route("/protected")
def protected():
    try:
        # Verify the JWT
        token = request.headers.get("Authorization", None).split(" ")[1]
        verify_jwt(token)
        return vars(get_protected_message())

    except ValueError as e:
        return jsonify({"error": str(e)}), 401


@bp.route("/admin")
def admin():
    return vars(get_admin_message())
