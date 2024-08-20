import gpsd from "node-gpsd";

let listener = new gpsd.Listener({
    port: 2947,
    hostname: 'localhost',
    logger: {
        info: () => { },
        warn: console.warn,
        error: console.error
    },
    parse: true
});

listener.on('TPV', data => {
    console.log({ data });
});

listener.on('SKY', sky => {
    console.log({ sky });
});

listener.on('INFO', info => {
    console.log({ info });
});

listener.on('DEVICE', device => {
    console.log({ device });
});

listener.on('DEVICES', devices => {
    console.log({ devices });
});

listener.on('VERSION', data => {
    console.log({ data });
});

listener.on('WATCH', data => {
    console.log({ data });
});

listener.on('POLL', poll => {
    console.log({ poll });
});

listener.connect(() => {
    console.log('Connected');
    listener.version();
    listener.devices();
    listener.device();
    // listener.poll();
    listener.watch({ class: 'WATCH', nmea: false, json: true });
});
