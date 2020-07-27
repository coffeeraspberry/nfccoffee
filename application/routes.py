from application import app
from application.models import *
from flask import json

@app.route("/")
def home():
    return 'Debug text: Hello world!'

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()]) 

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in Dates.query.all()])
