#!/usr/bin/env bash

eval 'sudo pkill -9 python3'
eval 'export FLASK_APP=app.py'
eval 'python3 pyscript.py'
