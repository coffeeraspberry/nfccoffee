from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    db.init_app(app)
    app.config.from_object('config.Config')

    with app.app_context():
        from . import routes  # Import routes
        with app.app_context():
            db.create_all() # Create sql tables for our data models 
        return app

if __name__ == "__main__":
    create_app()
