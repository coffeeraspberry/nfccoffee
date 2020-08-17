#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact
from . import db
from flask import json, request
import os, signal, csv, subprocess

def findUser(filename):
    with open(str(filename), "r") as file:
        uid = file.readline
    #user = db.session.query(Users).filter_by(UserID=uid)
    print(user)
    return json.dumps(str(uid))    

def getFrontJSON():
    print("Requesting JSON data...\n") #delete later
    data = request.get_json(force=True)
    print("Data:\n%s" % str(data)) #delete later
    return data

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/scan", methods=['GET','POST'])
def scan():
    user = findUser("user.txt")
    return json.dumps(user)

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in str(Dates.query.all())], sort_keys=True)

@app.route("/contacts", methods=['GET'])
def contacts():
    return json.dumps([w._asdict() for w in str(Contact.query.all())], sort_keys=True)

@app.route("/contact", methods=['GET','POST'])
def insertContacts():
    data = getFrontJSON()
    contact = Contact(Email=data['Email'], Name=data['Name'], Message=data['Message']) 
    success = True
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        success = False

    return json.dumps({'Success' : str(success)})

@app.route("/users", methods=['POST'])
def createUsers():
    data = getFrontJSON()
    user = Users(UserName=data['UserName'], Email=data['Email'], )
    #vezi cu fisierul
    success = True
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        success = False

    return json.dumps({'Success' : str(success)})

@app.route('/deleteUsers', methods=['GET'])
def deleteUsers():
    user = Users.query.filter_by(UserID=1).first()
    db.session.delete(user)
    db.session.commit()
    return "User %s was deleted from DB \n" % user
