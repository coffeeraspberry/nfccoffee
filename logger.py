#!/usr/bin/python3
import logging, logging.config
#set log configuration
<<<<<<< HEAD
logging.basicConfig(filename='app.log', filemode='a', format='TIMESTAMP: %(asctime)s PID: %(process)%d NAME: %(name)s - LEVEL: %(levelname)s - MESSAGE: %(message)s')
log = logging.getLogger('CoffeCounter')
log.setLevel(logging.DEBUG)
file_handler = logging.FileHandler('coffe.log')
file_handler.setLevel(logging.DEBUG)
log.addHandler(file_handler)
=======
logging.basicConfig(filename='app.log', filemode='w', format='TIMESTAMP: %(asctime)s PID: %(process)%d NAME: %(name)s - LEVEL: %(levelname)s - MESSAGE: %(message)s')
>>>>>>> 84c1af2af38531bd889428ad8f18a9cbd7cd7ea7
