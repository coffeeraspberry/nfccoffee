from flask import request, render_template, make_response
from datetime import datetime
from flask import current_app
from .models import db, Users, Dates

@app.route("/")
def home():
    return 'Debug text: Hello world!'

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()]) 
    