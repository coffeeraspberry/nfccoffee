#!/usr/bin/python3
from . import db
from collections import OrderedDict
from datetime import datetime
from sqlalchemy.sql import func

class DictSerializable(object):
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

class Admin(db.Model, DictSerializable):
    __tablename__ = 'Admin'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.String(120), nullable=False, default='admin')
    Password = db.Column(db.String(120), nullable=False, default='test')

    def __repr__(self):
        return '<Admin{}>'.format(self.id)

class Users(db.Model, DictSerializable):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.String(80), nullable=False, default="0")
    userRelationship = db.relationship("Dates")
    UserName = db.Column(db.String(80),  nullable=False, default='Unknown')
    Email = db.Column(db.String(120), nullable=False, default='Unknown')
    Counter = db.Column(db.Integer, nullable=False, default=0)
    CoffeeUnitPrice = db.Column(db.Float, nullable=False, default=1.5)
    AmountToPay = db.Column(db.Float, nullable=False, default=0)
    LastAccess = db.Column(db.DateTime, nullable=True, default=func.now())

    def __repr__(self):
        return '<User{}>'.format(self.id)

class Dates(db.Model, DictSerializable):
    __tablename__ = 'Dates'
    DateID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.id'))
    DateLog = db.Column(db.DateTime, nullable=False, default=func.now())
    
    def __repr__(self):
        return '<Date{}>'.format(self.DateID)

class Contact(db.Model, DictSerializable):
    __tablename__ = 'Contact'
    ContactID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email =  db.Column(db.String(150), unique=True, nullable=False, default='defaultEmail')
    Name = db.Column(db.String(150), unique=True, nullable=False, default='defaultName')
    Subject = db.Column(db.String(300), unique=True, nullable=False, default='defaultSubject')
    Message = db.Column(db.String(500), unique=True, nullable=False, default='defaultMessage')
    
    def __repr__(self):
        return '<Contact{}>'.format(self.ContactID)
        