#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact, Admin
from . import db
from flask import json, request, make_response, session, redirect, url_for
import os, signal, csv, subprocess, stream, logger
from pyscript import interuptScan, scanBadge
from time import sleep
from logger import *
import jwt, datetime
from functools import wraps

def require_api_token(func):
    log.info("require_api_token(func) function from application/routes.py  called")
    @wraps(func)
    def decorated(*args, **kwargs):
        token = None
        if 'token' in request.headers:
            token = request.headers['token']
            
        if not token:
            return json.dumps({'message' : 'Token is missing'}),401

        try:
            data = jwt.decode(token,app.config['SECRET_KEY'])
            current_user = Admin.query.filter_by(Email=data['Email']).first()
            return json.dumps({'success' : 'true'}),200
        except:
            return json.dumps({'success' : 'false'}),401

        return func(current_user,*args, **kwargs)
    
    return decorated

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

def findAdmin(email):
    log.info("findAdmin() function from application/routes.py  called")
    print('email: '+email)
    temp = Admin.query.filter_by(Email='%s' %(email)).first()
    return temp._asdict()

@app.route("/login", methods=['POST','GET'])
def login():
    log.info("/login route from application/routes.py  called")

    data = getFrontJSON()
    admin = findAdmin(data['Email'])
    print(admin)
    if data['Password'] == admin['Password']:
        token = jwt.encode({'Email' : data['Email'], 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        print(token)
        session['api_session_token'] = token
        return json.dumps({'token' : token.decode('UTF-8')})

    return make_response('Could not verify',401,{'WWW-Authenticate' : 'Basic realm="Login Required"'})    

@app.route("/admin", methods=['GET'])
@require_api_token
def admin(current_user):
    log.info("/admin route from application/routes.py  called")
    return

@app.route("/changepass", methods=['GET', 'POST'])
@require_api_token
def changePass(current_user):
    log.info("/changepass route from application/routes.py  called")
    data = getFrontJSON()
    admin = findAdmin(data['Email'])
    if(data['newPassword'] != data['confimPassword'] or admin is None):
        return json.dumps({'success' : 'false'}),401
    #update DB admin pass
    #Admin.query.filter_by(id=current_user['id']).update(dict(Password=data['newPassword']))
    current_user.Password = data['newPassword']
    success = True
    try:
        db.session.commit()
        log.info("Admin: %s password succesfully changed" %(data['Email']))
    except:
        success = False
    
    return json.dumps({'Success' : str(success)})


@app.route("/comment",methods=['POST'])
def comment():
    client = stream.connect('cacwd7veh7pg', 'z3te9ufeyfrt5k9x685zh5ph9y52jrwcjmydg2vk7ytvznvncgart7g7nw2qsm7j')
    frontData = getFrontJSON()
    user_token = client.create_user_token(str(frontData['username']))
    print(json.dumps({'token':user_token}))
    return json.dumps({'token':user_token})

@app.route("/users", methods=['GET'])
def users():
    log.info("/users [GET] route from application/routes.py  called")
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 

@app.route("/scan", methods=['GET'])
def scan():
    log.info("/scan route from application/routes.py  called")
    interuptScan = True
    user = findUser()
    interuptScan = False
    return user._asdict()

@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in Dates.query.all()], sort_keys=True)

@app.route("/contacts", methods=['GET'])
def contacts():
    log.info("/contacts route from application/routes.py  called")
    return json.dumps([w._asdict() for w in Contact.query.all()], sort_keys=True)

@app.route("/contact", methods=['GET','POST'])
def insertContacts():
    log.info("/contact route with insertContacts() function from application/routes.py  called")
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
