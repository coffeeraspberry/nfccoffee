#!/usr/bin/python3
import logging, logging.config
#set log configuration
logging.basicConfig(filename='app.log', filemode='w', format='TIMESTAMP: %(asctime)s PID: %(process)%d NAME: %(name)s - LEVEL: %(levelname)s - MESSAGE: %(message)s')