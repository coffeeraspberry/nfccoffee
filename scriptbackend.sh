#!/usr/bin/env bash

eval 'pkill -9 flask'
eval 'export FLASK_APP=app.py' # FLASK_ENV=development'
eval 'python3 run.py'
