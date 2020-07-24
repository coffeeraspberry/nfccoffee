from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from collections import OrderedDict #test

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pi.db'
db = SQLAlchemy(app)

###test

class DictSerializable(object):
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

###end test

class Users(db.Model, DictSerializable):
     __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    UserName = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    Counter = db.Column(db.Integer, nullable=True)
    LastAccess = db.Column(db.DateTime, nullable=True, default=datetime.now())

    def __repr__(self):
        return '<User %r>' % self.username

class Dates(db.Model, DictSerializable):
     __tablename__ = 'Dates'
    DateID = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer, nullable=False)
    DateLog = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def __repr__(self):
        return '<User %r>' % self.username

db.create_all()

@app.route("/")
def home():
    return 'Debug text: Hello world!'

@app.route("/users", methods=['GET'])
def users():
    return jsonify(users=list(Users.query.all()))
