import subprocess
import os

os.system("pkill -9 python3")

subprocess.call('python3 -m app &', shell=True)
subprocess.call('python3 nfcread.py',shell=True)