# GpsdReceiver - a gpsd-Based Receiver Client

This small application allows to gather, process and visualize the data captured by the `gpsd` deamon which one in turn gathers them from the GPS receiver module.

Since there is lots of GPS receiver modules on the market and they "speak" with various protocols, the `gpsd` brings the "glue" to connect the client applications (any of them) with the GPS receiver devices. In this case the `gpsd` connects directly to the GPS device and communicates with them using their own native protocols, then in turns it allows to connect to multiple client applications at the same time and provides the data in one unified and easy to consume fashion (using the JSON format for example).

This application is just one of the possible clients of the `gpsd`. The other useful clients can be Mosaic or `xgps` etc.

The GpsdReceiver application is composed of the NodeJS server process which communicates with `gpds` and the client which is the ReactJS application running on the web browser that gets and presents the data obtainerd from the server process.


## Connecting the GPS receiver module

Connect the GPS receiver module using the USB cable to the computer. Then check if it was recognized by the OS:

```bash
lsusb
```

You should see new USB device with similar description:

```
Bus 001 Device 006: ID 1546:01a9 U-Blox AG u-blox GNSS receiver
```

Now check if there is a new USB device registeres as a `/dev/tty*`

```bash
ls /dev/tty*
```

If you find new tty device you may see if it works and emits any communication:

```bash
sudo cat /dev/ttyACM0
```

## GPSD installation

```bash
sudo apt update
sudo apt install gpsd gpsd-clients
```

## Start the `gpsd` at the system start

> This might be not necessary. Just use the `systemctl enable gpsd` to ask the service to restart automaticaly on the OS restart.  

Edit the configuration:
```bash
sudo nano /etc/default/gpsd
```
Enter following content:

```
# Start the gpsd daemon automatically at boot time
START_DAEMON="true"

# Use USB hotplugging to add new USB devices automatically to the daemon
USBAUTO="true"

# Devices gpsd should collect to at boot time.
# They need to be read/writeable, either by user gpsd or the group dialout.
# DEVICES="/dev/ttyUSB0"
DEVICES=""

# Other options you want to pass to gpsd
GPSD_OPTIONS=""
```
## Starting and restarting the `gpsd`

The gpsd is installed by default as a systemd service thus it is now easy to manipulate, restart and see the status.

Now you can start/restart the `gpsd` deamon:
```bash
sudo systemctl restart gpsd
```

## GPSD clients

Nice client that shows the raw data:
```bash
xgps
```

## Integration with Google Earth

This tool in theory should feed the data from `gpsd` to Google Earth:
```bash
gegps
```

> Note: unfortunately this tool did not work for me.

