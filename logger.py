#!/usr/bin/python3
import logging, logging.config
#set log configuration
logging.basicConfig(filename='coffee.log', filemode='a', format='TIMESTAMP: %(asctime)s PID: %(process)%d NAME: %(name)s - LEVEL: %(levelname)s - MESSAGE: %(message)s')
log = logging.getLogger('CoffeCounter')
log.setLevel(logging.DEBUG)
file_handler = logging.FileHandler('coffee.log')
file_handler.setLevel(logging.DEBUG)
log.addHandler(file_handler)
