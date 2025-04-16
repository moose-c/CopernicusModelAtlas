from flask import Flask
from flask_cors import CORS

from api.db_interaction import db_interaction_views


def create_app():
    ##########################################
    # Environment Variables
    ##########################################
    # get necessary envs

    ##########################################
    # Flask App Instance
    ##########################################

    app = Flask(__name__, instance_relative_config=True)

    ##########################################
    # CORS
    ##########################################

    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        allow_headers=["Authorization", "Content-Type"],
        methods=["GET", "POST", "DELETE"],
        max_age=86400,
    )

    ##########################################
    # Blueprint Registration
    ##########################################

    app.register_blueprint(db_interaction_views.bp)

    return app
