from subprocess import Popen
import os

os.system("pkill -9 flask")
flask = Popen(['/usr/bin/python3' ,'-m', 'app.py'])

print("Are you lost baby girl? All good! PID: "+str(os.getgid())+" from: "+str(os.getcwd())+"\n\n")