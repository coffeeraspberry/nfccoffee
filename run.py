import subprocess

subprocess.call('python3 -m app &', shell=True)
subprocess.call('python3 nfcread.py',shell=True)