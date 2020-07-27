from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pi.db'
app.run(debug=True)

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Bring the DB model before creating it
from application import  models

# Build the database:
# This will create the database file using SQLAlchemy
with app.app_context():
    db.create_all() # Create sql tables for our data models 

# Bring the @app.routes()

from application import routes
