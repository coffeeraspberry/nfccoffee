#!/usr/bin/python3
import subprocess

subprocess.call('python3 -m app &', shell=True)
subprocess.call('python3 application/test.py',shell=True)
