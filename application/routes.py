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
    return "User %s was inserted in DB\n" % user

@app.route('/deleteUsers', methods=['GET'])
def deleteUsers():
    user = Users.query.filter_by(UserID=1).first()
    db.session.delete(user)
    db.session.commit()
    return "User %s was deleted from DB\n" % user

# delete later
import random
import string

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

@app.route("/addtest", methods=['POST', 'GET'])
def addtest():
    username = get_random_string(4)
    user = Users(UserName=username, Email=username+"@conti.ro")
    db.session.add(user)
    db.session.commit()
    return "User %s was inserted in DB\n" % user