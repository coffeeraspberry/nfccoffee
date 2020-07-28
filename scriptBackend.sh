#!/usr/bin/env bash

#start Flask backend app
flask='export FLASK_APP=app.py FLASK_ENV=development' #Flask vars; TO DO in producton: remove 'FLASK_ENV=development'
frun='python3 run.py'

eval $flask
eval $frun

