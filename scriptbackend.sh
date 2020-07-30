#!/usr/bin/env bash

eval 'curl localhost:5001/secretstopserver'
eval 'export FLASK_APP=app.py' # FLASK_ENV=development'
eval 'python3 run.py'
