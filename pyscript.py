#!/usr/bin/python3
import socket
import board
import busio
import adafruit_character_lcd.character_lcd_rgb_i2c as character_lcd
from digitalio import DigitalInOut
from adafruit_pn532.spi import PN532_SPI
from time import sleep
import sqlite3

con = sqlite3.connect('application/pi.db')

def getUser(con,UserID):
    cursor = con.cursor()
    cursor.execute('SELECT * from Users where UserID=\''+str(UserID)+'\'')
    user = cursor.fetchall()
    print(user)
    return user

def incrementUserCounter(con,user):
    cursor = con.cursor
    cursor.update('UPDATE Users SET Counter = Counter + 1 WHERE id = '+user[0])
    con.commit()

def addUserIfNotExists(con,uid):
    cursor = con.cursor()
    insert = 'INSERT INTO Users(UserID,UserName,Email,Counter,LastAccess) VALUES(\'%s\',\'%s\',\'%s\',0,CURRENT_TIMESTAMP)' % (str(uid),'Unknown','Unknown')
    print(insert)
    cursor.execute(insert)
    con.commit()

lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2)
lcd.color = [0, 0, 0]

spi = busio.SPI(board.SCK, board.MOSI, board.MISO)
cs_pin = DigitalInOut(board.D8)
pn532 = PN532_SPI(spi, cs_pin, debug=False)
ic, ver, rev, support = pn532.firmware_version
print("Found PN532 with firmware version: {0}.{1}".format(ver, rev))
pn532.SAM_configuration()

hostname = socket.gethostname()
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip_address = s.getsockname()[0]
s.close()

our_user = None
while True:
    # Check if a card is available to read
    uid = pn532.read_passive_target(timeout=0.5)
    print("UID: "+str(uid.hex()))
    # Try again if no card is available.
    if uid is None:
        lcd.message = str(hostname)+"\n"+str(ip_address)
    else:
        our_user = getUser(con,str(uid.hex()))
        if our_user:
            lcd.message = "Found User:\n%s" %(our_user[0][2])
            incrementUserCounter(con,our_user[0][4])
        else:
            addUserIfNotExists(con,str(uid.hex()))
            lcd.message = "Generic user added in DB\nPlease visit %s" %(str(ip_address))
    sleep(1)
    lcd.clear()     
    