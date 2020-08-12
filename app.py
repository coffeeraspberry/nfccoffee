from application import app
import subprocess

if __name__=='__main__':
     app.run(host='0.0.0.0', port=4321)
     print("Am ajuns pana aici!")
     