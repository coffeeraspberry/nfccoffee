#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact
from . import db
from flask import json, request
import os, signal, csv, subprocess, stream

def findUser():
    with open("/home/pi/back/nfccoffee/user.txt", "r+") as file:
        uid = file.read()
    file.close()
    temp = Users.query.filter_by(UserID='%s' %(uid)).first()
    return temp

def getFrontJSON():
    data = request.get_json(force=True)
    return data

@app.route("/comment",methods=['PUT'])
def comment():
    client = stream.connect('cacwd7veh7pg', 'z3te9ufeyfrt5k9x685zh5ph9y52jrwcjmydg2vk7ytvznvncgart7g7nw2qsm7j')
    frontData = getFrontJSON()
    user_token = client.create_user_token(str(frontData['username']))
    print(user_token)
    return json.dumps(user_token)

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

@app.route('/deleteUsers', methods=['DELETE'])
def deleteUsers():
    user = Users.query.filter_by(UserID=1).first()
    db.session.delete(user)
    db.session.commit()
    return "User %s was deleted from DB \n" % user
