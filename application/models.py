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

class Users(db.Model, DictSerializable):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.String(80), nullable=False, default="0")
    userRelationship = db.relationship("Dates") # test
    UserName = db.Column(db.String(80), unique=True, nullable=False, default='user')
    Email = db.Column(db.String(120), unique=True, nullable=False, default='email')
    Counter = db.Column(db.Integer, nullable=False, default=0, )
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
