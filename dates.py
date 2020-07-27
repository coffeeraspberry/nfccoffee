class Dates(db.Model, DictSerializable):
    __tablename__ = 'Dates'
    DateID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('Users.UserID')) # test
    DateLog = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def __repr__(self):
        return '<User %r>' % self.username

    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result
