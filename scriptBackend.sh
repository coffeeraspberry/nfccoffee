#!/usr/bin/env bash

#start Flask backend app
flask='export FLASK_APP=app.py FLASK_ENV=development' #Flask vars; TO DO in producton: remove 'FLASK_ENV=development'
frun='python3 -m flask run'

eval 'pkill -9 -f flask'

bash -c $( eval $flask; eval $frun ) &
process=$!

wait "$process"

echo "Servers run on other bash shell ; \n"
