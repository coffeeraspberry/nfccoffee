import subprocess

subprocess.call('pkill -9 python3', shell=True)
subprocess.call('python3 -m app &', shell=True)
subprocess.call('python3 nfcread.py',shell=True)