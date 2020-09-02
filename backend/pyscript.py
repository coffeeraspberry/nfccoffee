#!/usr/bin/python3
import socket, board, busio #imports for peripherals
import adafruit_character_lcd.character_lcd_rgb_i2c as character_lcd #this one is for LCD display
from digitalio import DigitalInOut #this one is for both (LCD & NFC)
from adafruit_pn532.spi import PN532_SPI #this one is for PN532 NFC
from time import sleep #delay for LCD
import sqlite3, subprocess #communication with Flask and DB
from logger import *

#Get Unknown existitng user from db to modify it's values like Name and Email
def getUser(con,UserID):
    cursor = con.cursor()
    cursor.execute('SELECT * from Users where UserID=\''+str(UserID)+'\'')
    user = cursor.fetchall()
    return user

#Increment Counter column in db and update the Amount he has to pay so far
def updateUser(con,user):
    cursor = con.cursor()
    cursor.execute('UPDATE Users SET Counter  =Counter + 1, LastAccess = CURRENT_TIMESTAMP, AmountToPay  =Counter*CoffeeUnitPrice WHERE UserID=\'%s\';' %(user[0][1]))
    con.commit()

#If a badge is scanned and UID doen't exist -> insert new row in db
def addUserIfNotExists(con,uid):
    cursor = con.cursor()
    insert = 'INSERT INTO Users(UserID,UserName,Email,Counter,CoffeeUnitPrice,AmountToPay,LastAccess) VALUES(\'%s\',\'%s\',\'%s\',0,1.5,0,CURRENT_TIMESTAMP)' % (str(uid),'Unknown','Unknown')
    print(insert)
    cursor.execute(insert)
    con.commit()

#settings for PN532 NFC Module
spi = busio.SPI(board.SCK, board.MOSI, board.MISO)
cs_pin = DigitalInOut(board.D8)
pn532 = PN532_SPI(spi, cs_pin, debug=False)
ic, ver, rev, support = pn532.firmware_version
print("Found PN532 with firmware version: {0}.{1}".format(ver, rev))
log.info("Found PN532 with firmware version: {0}.{1}".format(ver, rev))
pn532.SAM_configuration()

#A function made especially for /scan route
def scanBadge():
    try:
        uid = pn532.read_passive_target(timeout=0.3)
    except:
        print("UID is None. No badge scanned!")
        log.warning("UID is None. No badge scanned!")
        return None
    return uid

#A 'global' var to mimic a virtual interrupt
interuptScan = False

#Main logic
def mainf():
    #Launch Flask backend app an wait a little bit
    subprocess.call('python3 -m app &', shell=True)
    sleep(5)
    #connect pyscript.pi to db
    con = sqlite3.connect('application/pi.db')
    #settings for LCD display
    lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2)
    lcd.color = [0, 0, 0]
    hostname = socket.gethostname()
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #A nice trick found on StackOverflow to display local ip adress ;)
    s.connect(("8.8.8.8", 80))
    ip_address = s.getsockname()[0]
    s.close()

    #Infinite loop -> main program logic
    while True:
        #/scan route hasn't been requested
        if interuptScan is False:
            uid = scanBadge()
        #no badge has been scanned so far
        if uid is None:
            lcd.message = str(hostname)+"\n"+str(ip_address)
            print("No badge detected...")
            log.info("No badge detected")
        else: #a badge has been scanned
            print("UID: "+str(uid.hex())) #print for debub and demo pupose
            our_user = getUser(con,str(uid.hex())) #check if uid exists in db
            if our_user: #if uid exists than do that
                lcd.message = "Found User:\n%s" %(our_user[0][2])
                log.info("Found user %s" %(str(our_user[0][2])))
                lcd.message = "Remove card!"
                updateUser(con,our_user)
                log.info("Counter incremented")
                sleep(0.5)
            else: #otherwise insert new row in db
                addUserIfNotExists(con,str(uid.hex()))
                lcd.message = "Remove card!"
                sleep(1)
                lcd.message = "Generic user added in DB\nVisit %s" %(str(ip_address))
                log.info("Generic user added in DB")
        sleep(3)
        lcd.clear()     

if __name__=='__main__':
    log.info("pyscript.py has started")
    mainf()