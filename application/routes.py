#!/usr/bin/python3
from application import app
from application.models import Users, Dates
from . import db
from flask import json, request
import os, signal

def getFrontJSON():
    print("Requesting JSON data...\n") #delete later
    data = request.get_json(force=True)
    print("Data:\n%s" % str(data)) #delete later
    return data

@app.route("/")
def home():
    return "Hello, cross-origin-world!\n"

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in str(Dates.query.all())], sort_keys=True)

@app.route("/createUsers", methods=['POST'])
def createUsers():
    data = getFrontJSON()
    user = Users(UserName=data['UserName'], Email=data['Email'], Counter=data['Counter'])
    db.session.add(user)
    db.session.commit()
    return "User inserted in DB\n"

@app.route('/deleteUsers', methods=['GET'])
def deleteUsers():
    delete = Users.query.filter_by(UserID=1).first()
    return str(delete)