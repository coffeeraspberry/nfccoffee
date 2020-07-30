from application import app
from application.models import *
from flask import json
import os, signal

@app.route("/")
def home():
    return "Hello, cross-origin-world!"

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in str(Dates.query.all())], sort_keys=True)

@app.route('/secretstopserver', methods=['GET'])
def stopServer():
    os.kill(os.getpid(), signal.SIGINT)
    return jsonify({ "success": True, "message": "Server is shutting down..." })
