import subprocess
import os

os.system("pkill -9 flask")
os.system("pkill -9 python3")
#flask = Popen(['/usr/bin/python3' ,'-m', 'app'], stdin=PIPE, stderr=PIPE, stdout=PIPE)
subprocess.call('python3 -m app &', shell=True)
subprocess.call('python3 nfcread.py',shell=True)