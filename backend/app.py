from flask import Flask
from routes.gets import blp as GetRequestRoutes
from db.db_service import db

def create_app() -> Flask:
    app = Flask(__name__)

    app.config["PROPAGATE_EXCEPTIONS"] = False

    # Database configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"postgresql://admin:password@postgres:5435/txn_db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize the database
    db.init_app(app)

    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    app.register_blueprint(GetRequestRoutes)

    return app

# Create the app instance
app = create_app()