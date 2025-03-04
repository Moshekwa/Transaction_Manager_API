from flask import Flask

from routes.gets import blp as GetRequestRoutes
from routes.post import blp as PostRequestRoutes
from routes.put import blp as PutRequestRoutes
from routes.delete import blp as DeleteRequestRoutes

from db.db_service import db

def create_app() -> Flask:
    app = Flask(__name__)

    app.config["PROPAGATE_EXCEPTIONS"] = False

    #app.config["API_TITLE"] = "Transaction Manager API"
    #app.config["API_VERSION"] = "v1"
    #app.config["OPENAPI_VERSION"] = "3.0.2"
    #app.config["OPENAPI_URL_PREFIX"] = "/"
    #app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"

    # postgRES Service Config
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"postgresql+psycopg2://admin:password@postgres:5432/txn_db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize the database
    db.init_app(app)

    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    app.register_blueprint(GetRequestRoutes)
    app.register_blueprint(PostRequestRoutes)
    app.register_blueprint(PutRequestRoutes)
    app.register_blueprint(DeleteRequestRoutes)

    return app

# Create the app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)