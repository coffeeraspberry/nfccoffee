from subprocess import Popen
import os

os.system("pkill -9 flask")
flask = Popen(['/usr/bin/python3' ,'app.py'])

print("Are you lost baby girl? All good! PID: "+os.getgid()+" from: "+os.getcwd()+"\n\n")