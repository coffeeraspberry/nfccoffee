from application import app
import threading

if __name__=='__main__':
    #app.run(debug=True)
     threading.Thread(target=app.run).start()
     print("Flask runs on thread! Continue scripting baby girl ;)\n")
