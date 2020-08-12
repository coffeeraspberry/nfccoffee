from application import app
import subprocess, threading

def doSmth():
     subprocess.call('python3 application/test.py',shell=True)
     print("Am ajuns pana aici!")

if __name__=='__main__':
     #threading.Thread(doSmth).start()
     app.run(host='0.0.0.0', port=4321)
     threading.Thread(doSmth).start()
     