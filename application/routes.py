from application import app
from application.models import *
from flask import json

@app.route("/")
def home():
    return "Hello, cross-origin-world!"

@app.route("/users", methods=['GET'])
def users():
    users = [u._asdict() for u in Users.query.all()]
    for key in users:
        users[key] = str(users[key])
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True)
    #return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in str(Dates.query.all())], sort_keys=True)
