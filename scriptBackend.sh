#!/usr/bin/env bash

#start Flask backend app
flask='export FLASK_APP=app.py FLASK_ENV=development' #Flask vars; TO DO in producton: remove 'FLASK_ENV=development'
frun='python3 -m flask run'
bash -c $( eval $flask; eval $frun ) &
echo "Servers run on other bash shell ;)"
