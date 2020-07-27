from flask_sqlalchemy import SQLAlchemy

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
    
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result
