#!/usr/bin/python3
import socket
import board
import busio
import adafruit_character_lcd.character_lcd_rgb_i2c as character_lcd
from digitalio import DigitalInOut
from adafruit_pn532.spi import PN532_SPI

def lcdSetup():
    lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2)
    lcd.color = [0, 0, 0]

def pn532Setup():
    #req_pin = DigitalInOut(board.D12)
    spi = busio.SPI(board.SCK, board.MOSI, board.MISO)
    cs_pin = DigitalInOut(board.D8)
    pn532 = PN532_SPI(spi, cs_pin, debug=False)
    ic, ver, rev, support = pn532.firmware_version
    print("Found PN532 with firmware version: {0}.{1}".format(ver, rev))
    pn532.SAM_configuration()

def webapp():
    hostname = socket.gethostname()
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip_address = s.getsockname()[0]
    s.close()
    return hostname, ip_address

if __name__=='__main__':
    
    lcdSetup()
    pn532Setup()

    lcd.clear()
    lcdmessage = webapp()

    while True:
        # Check if a card is available to read
        uid = pn532.read_passive_target(timeout=0.5)
        # Try again if no card is available.
        if uid is None:
            lcd.message = str(lcdmessage[0])+"\n"+str(lcdmessage[1])
        lcd.clear()    
        #print("Found card with UID:\n", [hex(i) for i in uid])
        lcd.message("Found card with UID:\n", str(uid).strip('[]',','))