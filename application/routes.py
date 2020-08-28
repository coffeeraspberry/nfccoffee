#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact
from . import db
from flask import json, request
import os, signal, csv, subprocess, stream, logger
from pyscript import interuptScan, scanBadge
from time import sleep
from logger import *

def findUser():
    log.info("findUser() function from application/routes.py  called")
    uid = scanBadge()
    while uid is None:
        uid = scanBadge()
    uid = uid.hex()
    temp = Users.query.filter_by(UserID='%s' %(uid)).first()
    return temp

def getFrontJSON():
    log.info("getFrontJSON() function from application/routes.py  called")
    data = request.get_json(force=True)
    log.info("getFrontJSON() returned: %s " %(str(data)))
    return data

@app.route("/comment",methods=['POST'])
def comment():
    client = stream.connect('cacwd7veh7pg', 'z3te9ufeyfrt5k9x685zh5ph9y52jrwcjmydg2vk7ytvznvncgart7g7nw2qsm7j')
    frontData = getFrontJSON()
    user_token = client.create_user_token(str(frontData['username']))
    print(json.dumps({'token':user_token}))
    return json.dumps({'token':user_token})

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/scan", methods=['GET'])
def scan():
    interuptScan = True
    user = findUser()
    interuptScan = False
    return user._asdict()

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in Dates.query.all()], sort_keys=True)

@app.route("/contacts", methods=['GET'])
def contacts():
    return json.dumps([w._asdict() for w in Contact.query.all()], sort_keys=True)

@app.route("/contact", methods=['GET','POST'])
def insertContacts():
    data = getFrontJSON()
    contact = Contact(Email=data['Email'], Name=data['Name'], Subject=data['Subject'], Message=data['Message']) 
    success = True
    try:
        db.session.add(contact)
        db.session.commit()
    except Exception as e:
        success = False
    return json.dumps({'Success' : str(success)})

@app.route("/users", methods=['POST'])
def createUsers():
    data = getFrontJSON()
    if data['UserName'] == "":
        data['UserName'] = "Unknown"
    if data['Email'] == "":
        data['Email'] = "Unknown"
    user = Users.query.filter_by(UserID=data['UserID']).update(dict(UserName=data['UserName'], Email=data['Email']))
    success = True
    try:
        db.session.commit()
        print("User updated succesfully")
    except Exception as e:
        success = False

    return json.dumps({'Success' : str(success)})
