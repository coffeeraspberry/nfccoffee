#!/usr/bin/python3
from application import app
from application.models import Users, Dates, Contact, Admin
from . import db
from flask import json, request, make_response, session, redirect, url_for
import os, signal, csv, subprocess, stream, logger, re
from pyscript import interuptScan, scanBadge
from time import sleep
from logger import *
import jwt, datetime
from functools import wraps

#token auth for all admin pages
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
#get JSON data from body
def getFrontJSON():
    log.info("getFrontJSON() function from application/routes.py  called")
    data = request.get_json(force=True)
    log.info("getFrontJSON() returned: %s " %(str(data)))
    return data

def findAdmin(email):
    log.info("findAdmin() function from application/routes.py  called")
    temp = Admin.query.filter_by(Email='%s' %(email)).first()
    if temp is None:
        return False
    return temp._asdict()

def checkEmail(email):   
    if(re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$',email)):  
        return False
    return True

def checkUserName(username):   
    if all(x.isalpha() or x.isspace() for x in username):  
        return True 
    return False 

@app.route("/login", methods=['POST','GET'])
def login():
    log.info("/login route from application/routes.py  called")

    data = getFrontJSON()
    admin = findAdmin(data['Email'])
    print(admin)

    if not admin:
        return json.dumps({'success' : 'false'}),401
        
    if data['Password'] == admin['Password']:
        token = jwt.encode({'Email' : data['Email'], 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        print(token)
        session['api_session_token'] = token
        return json.dumps({'token' : token.decode('UTF-8')})

    return json.dumps({'success' : 'false'}),401

@app.route("/admin", methods=['GET'])
@require_api_token
def admin(current_user):
    log.info("/admin route from application/routes.py  called")
    if current_user:
        return json.dumps({'success' : 'true'}),200
    return json.dumps({'success' : 'false'}),401
#change admins passwords
@app.route("/changepass", methods=['GET','POST'])
@require_api_token
def changePass(current_user):
    log.info("/changepass route from application/routes.py  called")
    data = getFrontJSON()
    admin = Admin.query.filter_by(Email=current_user.Email).first()
    if(data['newPassword'] != data['confirmPassword'] or data['password']!=admin.Password):
        return json.dumps({'success' : 'false'}),401

    admin.Password = data['newPassword']
    try:
        db.session.commit()
        success = True
    except:
        success = False
    
    if success == False:
        return json.dumps({'success' : 'false'}),401
    return json.dumps({'success' : 'true'}),200
#save edits made by admin on Users table
@app.route("/save", methods=['GET','POST'])
@require_api_token
def save(current_user):
    log.info("/save route from application/routes.py  called")
    data = getFrontJSON()
    
    user = Users.query.filter_by(UserID=data['uid']).first()
    user.Email = data['Email'] if user.Email != data['Email'] else user.Email
    user.UserName = data['Username'] if user.UserName != data['Username'] else user.UserName
    user.CoffeeUnitPrice = data['CoffeeUnitPrice'] if user.CoffeeUnitPrice != data['CoffeeUnitPrice'] else user.CoffeeUnitPrice
    
    try:
        db.session.commit()
        success = True
    except:
        success = False
    
    if success == False:
        return json.dumps({'success' : 'false'}),401
    return json.dumps({'success' : 'true'}),200
#reset counter admin command
@app.route("/resetCounter", methods=['GET','POST'])
@require_api_token
def resetCounter(current_user):
    log.info("/resetCounter route from application/routes.py  called")
    data = getFrontJSON()
    user = Users.query.filter_by(UserID=data['uid']).first()
    user.Counter = 0
    user.AmountToPay = 0;
    try:
        db.session.commit()
        success = True
    except:
        success = False
    
    if success == False:
        return json.dumps({'success' : 'false'}),401
    return json.dumps({'success' : 'true'}),200
#generate token for posting a new comment in frontend feed
@app.route("/comment",methods=['POST'])
def comment():
    client = stream.connect('cacwd7veh7pg', 'z3te9ufeyfrt5k9x685zh5ph9y52jrwcjmydg2vk7ytvznvncgart7g7nw2qsm7j')
    frontData = getFrontJSON()
    user_token = client.create_user_token(str(frontData['username']))
    print(json.dumps({'token':user_token}))
    return json.dumps({'token':user_token})
#display users from Users table in a JSON manner
@app.route("/users", methods=['GET'])
def users():
    log.info("/users [GET] route from application/routes.py  called")
    return json.dumps([u._asdict() for u in Users.query.all()], sort_keys=True) 
#edit own data based on badge scanning (without admin rights)
@app.route("/scan", methods=['GET'])
def scan():
    log.info("/scan route from application/routes.py  called")
    interuptScan = True
    user = findUser()
    interuptScan = False
    return user._asdict()
#not used so far
@app.route("/logs", methods=['GET'])
def logs():
    return json.dumps([v._asdict() for v in Dates.query.all()], sort_keys=True)
#display messages from Contact page
@app.route("/contacts", methods=['GET'])
def contacts():
    log.info("/contacts route from application/routes.py  called")
    return json.dumps([w._asdict() for w in Contact.query.all()], sort_keys=True)
#insert into DB a new Contact message
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
#update user (works with /scan) without admin rights
@app.route("/users", methods=['POST'])
def createUsers():
    data = getFrontJSON()
    #user = Users.query.filter_by(UserID=data['UserID']).update(dict(UserName=data['UserName'], Email=data['Email']))
    user = Users.query.filter_by(UserID=data['UserID']).first()
    if data['UserName'] == "" or not checkUserName(data['UserName']):
        user.UserName = user.UserName
    else:
        user.UserName = data['UserName']
    if checkEmail(data['Email']) or data['Email'] == "":
        user.Email = user.Email
        print("Am ajuns aici in if")
    else:
        user.Email = data['Email']

    try:
        print("Am ntrat in try")
        db.session.commit()
        success = True
        print("User updated succesfully")
    except Exception as e:
        success = False
    return json.dumps({'success' : str(success)})
