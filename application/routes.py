from flask import Flask, jason

@app.route("/")
def home():
    return 'Debug text: Hello world!'

@app.route("/users", methods=['GET'])
def users():
    return json.dumps([u._asdict() for u in Users.query.all()]) 
