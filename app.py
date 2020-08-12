from application import app
import subprocess

if __name__=='__main__':
     app.run(host='0.0.0.0', port=4321)
     subprocess.call('python3 application/test.py',shell=True)
     print("Am ajuns pana aici!")
     