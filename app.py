from application import app
from logger import *

if __name__=='__main__':
     log.info("Flask app is starting")
     app.run(host='0.0.0.0', port=8080)
  