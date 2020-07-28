#!/usr/bin/env bash

#start Flask backend app
#back='cd /backend' #first change dir to backend
flask='export FLASK_APP=app.py FLASK_ENV=development' #Flask vars; TO DO in producton: remove 'FLASK_ENV=development'
frun='python3 -m flask run'
eval $flask
eval $frun
