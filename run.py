from subprocess import Popen

#os.system("python3 "+ "app.py &" )
flask = Popen(['/usr/bin/python3' ,' app.py & '])

print("hello, its working, flask is running backgound...\n")