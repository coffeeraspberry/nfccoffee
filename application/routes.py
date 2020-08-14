#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact
from . import db
from flask import json, request
import os, signal, csv, subprocess

def getFrontJSON():
    print("Requesting JSON data...\n") #delete later
    data = request.get_json(force=True)
    print("Data:\n%s" % str(data)) #delete later
    return data

def makeCSV(table):
    subprocess.call('sqlite3 -header -csv application/pi.db \"select * from ' + str(table) + '" > ' + str(table) + '.csv', shell=True)

@app.route("/", methods=['GET'])
def home():
    return "Hello\n"

@app.route("/", methods=['POST'])
def home():
    return "World!\n"

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in str(Dates.query.all())], sort_keys=True)

@app.route("/contacts", methods=['GET'])
def contacts():
    return json.dumps([w._asdict() for w in str(Contact.query.all())], sort_keys=True)


@app.route("/contact", methods=['GET','POST'])
def insertContacts():
    data = getFrontJSON()
    return "Contact %s recieved\n" % str(data)

@app.route("/createUsers", methods=['GET','POST'])
def createUsers():
    data = getFrontJSON()
    user = Users(UserName=data['UserName'], Email=data['Email'])
    #db.session.add(user)
    #db.session.commit()
    return "User %s was inserted in DB\n" % user

@app.route('/deleteUsers', methods=['GET'])
def deleteUsers():
    user = Users.query.filter_by(UserID=1).first()
    db.session.delete(user)
    db.session.commit()
    return "User %s was deleted from DB \n" % user
    