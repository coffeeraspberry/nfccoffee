#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact
from . import db
from flask import json, request
import os, signal, csv, subprocess

def findUser():
    #uid="fab0671a"
    with open("/home/pi/back/nfccoffee/user.txt", "r+") as file:
        uid = file.read()
    file.close()
    #user = db.session.query(Users).filter_by(UserID=uid).firsr()
    #return json.dumps([usr._asdict() for usr in Users.query.filter_by(UserID=str(uid)).first()])    
    #temp = db.session.query(Users).filter_by(UserID='\'%s\'' %(uid)).first()
    temp = Users.query.filter_by(UserID='%s' %(uid)).first()
    return temp

def getFrontJSON():
    print("Requesting JSON data...\n") #delete later
    data = request.get_json(force=True)
    print("Data:\n%s" % str(data)) #delete later
    return data

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/scan", methods=['GET'])
def scan():
    user = findUser()
    return user._asdict()

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
