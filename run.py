#!/usr/bin/python3
import subprocess
from time import sleep

subprocess.call('python3 application/test.py',shell=True)
subprocess.call('python3 -m app &', shell=True)