#!/usr/bin/python3
from application import db, board, busio, socket, DigitalInOut, character_lcd, PN532_SPI
from application.models import Users

#set LCD AdaFruit 16x2 on I2C interface
lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2)

#Set RFID PN532 on SPI interface
spi = busio.SPI(board.SCK, board.MOSI, board.MISO)
cs_pin = DigitalInOut(board.D8)
pn532 = PN532_SPI(spi, cs_pin, debug=False)
ic, ver, rev, support = pn532.firmware_version
print("Found PN532 with firmware version: {0}.{1}".format(ver, rev))
pn532.SAM_configuration()

#Minor trick to get Hostname and local IP Adress
hostname = socket.gethostname()
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip_address = s.getsockname()[0]
s.close()

while True:
    # Check if a card is available to read
    uid = pn532.read_passive_target(timeout=0.5)
    # Try again if no card is available.
    if uid is None:
        lcd.message = str(hostname)+"\n"+str(ip_address)
    else:
        our_user = db.session.query(Users).filter_by(UserID=str(uid.hex()))
        if our_user:
            lcd.message = "Found User:\n%s" %(str(our_user['UserName']))
            our_user['Counter'] = our_user['Counter'] + 1
        else:
            db.session.add(Users(UserID=str(uid.hex()))
            lcd.message = "Generic user added in DB\nPlease visit %s" %(str(ip_address))
    db.session.commit()
    sleep(1)
    lcd.clear()    
    