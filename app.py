from application import app
from threading import Thread

if __name__=='__main__':
    #app.run(debug=True)
     Thread(target=app.run).run()
     print("Flask runs on thread! Continue scripting baby girl ;)\n")
