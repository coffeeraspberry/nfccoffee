# Python backend
> Please, please, please! If nothing at all does not make any sense just DO NOT TOUCH IT! Thank you! :)

# Context

Backend subproject part of **Coffe_counter** web-app built inside Continental Summer Practice 2020. 

# Install

> sudo apt-get install build-essential python-dev git vim nano sqlite3 python3 python3-pip libnfc5 libnfc-bin -y

> pip3 install --upgrade setuptools

> sudo pip3 install Flask Flask-Cors Flask-SQLAlchemy adafruit-circuitpython-busdevice adafruit-circuitpython-pn532 adafruit-circuitpython-charlcd pystream-protobuf

> git clone --single-branch --branch backend https://github.com/coffeeraspberry/nfccoffee.git

# Run

> cd nfccoffee/
> sh scriptbackend.sh

## About and usage!
  * the 'offline' script called pyscript.py starts 
  * a subprocess calls the Flask server (aka app.py)
  * pyscript scans every second for card and displays different messages on LCD screen
  * when /scan route is called from frontend, a 'virtual interrupt' is generated
  * [to be continued]

### Requirments

Coffee_counter Python backend uses a number of open source projects to work properly:

* asn1crypto==0.24.0
* certifi==2018.8.24
* chardet==3.0.4
* click==7.1.2
* cryptography==2.6.1
* distro-info==0.21
* entrypoints==0.3
* **Flask==1.1.2**
* **Flask-SQLAlchemy==2.4.4**
* idna==2.6
* importlib-metadata==1.7.0
* itsdangerous==1.1.0
* Jinja2==2.11.2
* jsonpickle==1.4.1
* keyring==17.1.1
* keyrings.alt==3.1.1
* MarkupSafe==1.1.1
* pycrypto==2.6.1
* pycurl==7.43.0.2
* PyGObject==3.30.4
* python-apt==1.8.4.1
* pyxdg==0.25
* requests==2.21.0
* SecretStorage==2.3.1
* six==1.12.0
* **SQLAlchemy==1.3.18**
* **SQLAlchemy-Utils==0.36.8**
* ssh-import-id==5.7
* unattended-upgrades==0.1
* urllib3==1.24.1
* Werkzeug==1.0.1
* **zipp==3.1.0**

And of course:
* **Python 3.x**
* **PIP3**
* **sqlite3**
