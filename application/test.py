with open("/home/pi/back/nfccoffee/user.txt", "r+") as file:
        uid = file.read()
file.close()
print(uid)
type(uid)