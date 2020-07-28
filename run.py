import subprocess
import os

os.system("pkill -9 flask")
#flask = Popen(['/usr/bin/python3' ,'-m', 'app'], stdin=PIPE, stderr=PIPE, stdout=PIPE)
subprocess.call('python3 -m app', shell=True)
print("\nAre you lost baby girl? All good!\n")