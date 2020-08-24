#!/usr/bin/python3
import socket, board, busio
import adafruit_character_lcd.character_lcd_rgb_i2c as character_lcd
from digitalio import DigitalInOut
from adafruit_pn532.spi import PN532_SPI
from time import sleep
import sqlite3, subprocess

def getUser(con,UserID):
    cursor = con.cursor()
    cursor.execute('SELECT * from Users where UserID=\''+str(UserID)+'\'')
    user = cursor.fetchall()
    return user

def incrementUserCounter(con,user):
    cursor = con.cursor()
    cursor.execute('UPDATE Users SET Counter = Counter + 1, LastAccess=CURRENT_TIMESTAMP WHERE UserID = \'%s\'' %(user[0][1]))
    con.commit()

def addUserIfNotExists(con,uid):
    cursor = con.cursor()
    insert = 'INSERT INTO Users(UserID,UserName,Email,Counter,LastAccess) VALUES(\'%s\',\'%s\',\'%s\',0,CURRENT_TIMESTAMP)' % (str(uid),'Unknown','Unknown')
    print(insert)
    cursor.execute(insert)
    con.commit()

spi = busio.SPI(board.SCK, board.MOSI, board.MISO)
cs_pin = DigitalInOut(board.D8)
pn532 = PN532_SPI(spi, cs_pin, debug=False)
ic, ver, rev, support = pn532.firmware_version
print("Found PN532 with firmware version: {0}.{1}".format(ver, rev))
pn532.SAM_configuration()

def scanBadge():
    try:
        uid = pn532.read_passive_target(timeout=0.3)
    except:
        print("UID is None. No badge scanned!")
        return None
    return uid

interuptScan = False

def mainf():
    subprocess.call('python3 -m app &', shell=True)
    con = sqlite3.connect('application/pi.db')

    lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2)
    lcd.color = [0, 0, 0]
    hostname = socket.gethostname()
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip_address = s.getsockname()[0]
    s.close()

    while True:

        if interuptScan is False:
            uid = scanBadge()

        if uid is None:
            lcd.message = str(hostname)+"\n"+str(ip_address)
            print("No badge detected...")
        else:
            print("UID: "+str(uid.hex()))
            our_user = getUser(con,str(uid.hex()))
            
            if our_user:
                lcd.message = "Found User:\n%s" %(our_user[0][2])
                lcd.message = "Remove card!"
                incrementUserCounter(con,our_user)
                sleep(0.5)
            else:
                addUserIfNotExists(con,str(uid.hex()))
                lcd.message = "Remove card!"
                sleep(1)
                lcd.message = "Generic user added in DB\nVisit %s" %(str(ip_address))
        sleep(3)
        #lcd.clear()     

if __name__=='__main__':
     mainf()