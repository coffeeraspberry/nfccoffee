#!/usr/bin/python3
import subprocess
from time import sleep

subprocess.call('python3 pyscript.py',shell=True)
subprocess.call('python3 -m app &', shell=True)