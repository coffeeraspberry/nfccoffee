from . import db
from collections import OrderedDict
from datetime import datetime

class DictSerializable(object):
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

    def __repr__(self):
        return '<User %r>' % self.username

class Users(db.Model, DictSerializable):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userRelationship = db.relationship("Dates") # test
    UserName = db.Column(db.String(80), unique=True, nullable=False, default='user')
    Email = db.Column(db.String(120), unique=True, nullable=False, default='email')
    Counter = db.Column(db.Integer, nullable=False, default=0)
    LastAccess = db.Column(db.DateTime, nullable=True, default=datetime.now())

    

class Dates(db.Model, DictSerializable):
    __tablename__ = 'Dates'
    DateID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID'))
    DateLog = db.Column(db.DateTime, nullable=False, default=datetime.now())
