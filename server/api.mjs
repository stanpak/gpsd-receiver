import gpsd from "node-gpsd";
import { settings } from "./settings.mjs";
import { mean, standardDeviation } from "simple-statistics";

// https://gpsd.gitlab.io/gpsd/gpsd_json.html

// Simple Statistics:
// https://simple-statistics.github.io/docs/

// This is the collection of the readings from the gpsd of the points "TPV".
const pointReadings = [];

setInterval(() => {
    addNewItemToCache(pointReadings, {
        class: 'TPV',
        device: '/dev/ttyACM0',
        mode: 3,
        time: '2024-08-16T18:10:53.000Z',
        leapseconds: 18,
        ept: 0.005,
        lat: 32.161865687 + Math.random() * 0.001865687,
        lon: -109.541588222 + Math.random() * 0.001865687,
        altHAE: 1573.535,
        altMSL: 1600.759,
        alt: 1600.759 + Math.random() * 10,
        epx: 3.003 + Math.random() * 10,
        epy: 6.508 + Math.random() * 10,
        epv: 27.37,
        magvar: 9.1,
        speed: 0.004,
        climb: 0.009,
        eps: 13.02,
        epc: 54.74,
        geoidSep: -27.224,
        eph: 12.73,
        sep: 26.03
    }
    );
}, 1000);



// This is the collection of the readings from the gpsd of the sattelites "SKY".
const satteliteReadings = [];

setInterval(() => {
    let count = Math.ceil(3 + Math.random() * 10);
    let sats = {
        class: 'SKY',
        device: '/dev/ttyACM0',
        xdop: 0.4 + Math.random() * 2 - 1,
        ydop: 0.43 + Math.random() * 2 - 1,
        vdop: 1.19,
        tdop: 0.68,
        hdop: 0.67,
        gdop: 1.35,
        pdop: 1.37,
        nSat: count,
        uSat: 25,
        satellites: []
    };

    for (let i = 0; i < count; i++) {
        sats.satellites.push({
            PRN: "S" + Math.ceil(Math.random() * 10000),
            az: Math.random() * 100 - 50,
            el: Math.random() * 100 - 50,
            freqid: 234,
            gnssid: 123,
            health: 1,
            ss: 0,
            sigid: 123,
            svid: 234,
            used: 3,
        });
    }

    addNewItemToCache(satteliteReadings, sats);

}, 1000);


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

let version;

listener = new gpsd.Listener({
    port: settings.port,
    hostname: settings.host,
    logger: {
        info: () => { },
        warn: console.warn,
        error: console.error
    },
    parse: true
});

listener.on('TPV', data => {
    console.log({ data });
    addNewItemToCache(pointReadings, data);
});

listener.on('SKY', sky => {
    console.log({ sky });
    addNewItemToCache(satteliteReadings, sky);
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
    version = data;
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


export function registerApi(app) {

    app.get('/settings', (req, res) => {
        res.json(settings);
    });

    app.get('/version', (req, res) => {
        res.json(version);
    });

    app.get('/point/clearCache', (req, res) => {
        pointReadings.splice(0, pointReadings.length);
        satteliteReadings.splice(0, satteliteReadings.length);

        res.json({
            points: pointReadings.length,
            satellites: satteliteReadings.length,
        });
    });

    app.get('/recent', (req, res) => {
        let readings = {
            point: pointReadings.length !== 0 ? pointReadings[pointReadings.length - 1] : undefined,
            satellites: satteliteReadings.length !== 0 ? satteliteReadings[satteliteReadings.length - 1] : undefined,
        }
        res.json(readings);
    });

    app.get('/point', (req, res) => {
        res.json(pointReadings.length !== 0 ? pointReadings[pointReadings.length - 1] : null);
    });

    app.get('/points', (req, res) => {

        if (pointReadings.length !== 0) {
            let latArr = pointReadings.map(v => v.item.lat);
            let lonArr = pointReadings.map(v => v.item.lon);

            let data = {
                latMean: mean(latArr),
                lonMean: mean(lonArr),
                latStdDev: standardDeviation(latArr),
                lonStdDev: standardDeviation(lonArr),
                points: pointReadings,
            }
            res.json(data);
        } else
            res.json(null);
    });

    app.get('/satellites', (req, res) => {
        res.json(satteliteReadings.length !== 0 ? satteliteReadings[satteliteReadings.length - 1] : null);
    });


    app.get('/all', (req, res) => {
        res.json({ points: pointReadings, satellites: satteliteReadings });
    });
}

function addNewItemToCache(cache, item) {
    let now = new Date();
    cache.push({ time: now, item: item });
    let expiresOn = new Date(now - settings.cache.retentionMinutes * 1000 * 60);
    for (let p of cache) {
        if (p.time <= expiresOn)
            cache.shift();
        else
            break;
    }
}
