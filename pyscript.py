#!/usr/bin/python3
import socket
import board
import busio
import adafruit_character_lcd.character_lcd_rgb_i2c as character_lcd
from digitalio import DigitalInOut
from adafruit_pn532.spi import PN532_SPI
from time import sleep


lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2)
lcd.color = [0, 0, 0]


#req_pin = DigitalInOut(board.D12)
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

def convertUIDtoSTR(uid):
    STRUID = [str(int(i,16)) for i in uid] 
    return STRUID

while True:
    # Check if a card is available to read
    uid = pn532.read_passive_target(timeout=0.5)
    printuid = convertUIDtoSTR(uid)
    # Try again if no card is available.
    if uid is None:
        lcd.message = str(hostname)+"\n"+str(ip_address)
    else:
        #print("Found card with UID:\n", [hex(i) for i in uid])
        lcd.message = "Found card with UID:\n%s" %(str(uid))
    sleep(2)
    lcd.clear()    
    