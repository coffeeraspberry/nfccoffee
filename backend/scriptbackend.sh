#!/usr/bin/env bash

eval 'pkill -9 python3' #yep, pretty sure; not the most desirable thing to do but 'hey' it's working
eval 'export FLASK_APP=app.py' # FLASK_ENV=development'
eval 'python3 pyscript.py'
