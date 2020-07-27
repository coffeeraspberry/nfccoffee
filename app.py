### Imports

from flask import Flask, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from collections import OrderedDict

### Flask config

app = Flask(__name__)
app.run(debug=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pi.db'
db = SQLAlchemy(app)

### Database model

class DictSerializable(object):
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

class Users(db.Model, DictSerializable):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userRelationship = db.relationship("Dates") # test
    UserName = db.Column(db.String(80), unique=True, nullable=False, default='user')
    email = db.Column(db.String(120), unique=True, nullable=False, default='email')
    Counter = db.Column(db.Integer, nullable=True)
    LastAccess = db.Column(db.DateTime, nullable=True, default=datetime.now())

    def __repr__(self):
        return '<User %r>' % self.username

class Dates(db.Model, DictSerializable):
    __tablename__ = 'Dates'
    DateID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID')) # test
    DateLog = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def __repr__(self):
        return '<User %r>' % self.username

### DB create if not exists
with app.app_context():
    db.create_all()

### Flask routes

@app.route("/")
def home():
    return 'Debug text: Hello world!'

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()]) 

### To be continued
