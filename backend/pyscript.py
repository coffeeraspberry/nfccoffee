#!/usr/bin/python3
import socket
import board
import busio
import adafruit_character_lcd.character_lcd_rgb_i2c as character_lcd

lcd = character_lcd.Character_LCD_RGB_I2C(busio.I2C(board.SCL, board.SDA), 16, 2) 
lcd.color = [0, 0, 0]

hostname = socket.gethostname()
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip_address = s.getsockname()[0]
s.close()

lcd.clear()

lcd.message = str(hostname)+"\n"+str(ip_address)
