import gpsd from "node-gpsd";
import { settings } from "./settings.mjs";
import { mean, standardDeviation } from "simple-statistics";
import { v4 as uuidv4 } from 'uuid';

// https://gpsd.gitlab.io/gpsd/gpsd_json.html

// Simple Statistics:
// https://simple-statistics.github.io/docs/

// This is the collection of the readings from the gpsd of the points "TPV".
const pointReadings = [];

// This is the collection of the readings from the gpsd of the sattelites "SKY".
let satteliteReading;

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
    // console.log("TPV", new Date());
    addNewItemToCache(pointReadings, data);
});

listener.on('SKY', sky => {
    // console.log({ sky });
    if (sky.satellites)
        for (let s of sky.satellites) {
            s.id = uuidv4();

            if (s.gnssid === 3) {
                s.constellationName = "BeiDou";
                s.constellationAbr = "BD";
                s.svidRange = { min: 1, max: 37 };
            } else
                if (s.gnssid === 2) {
                    s.constellationName = "Galileo";
                    s.constellationAbr = "GA";
                    s.svidRange = { min: 1, max: 36 };
                } else
                    if (s.gnssid === 6) {
                        s.constellationName = "GLONASS";
                        s.constellationAbr = "GL";
                        s.svidRange = { min: 1, max: 35 };
                    } else
                        if (s.gnssid === 0) {
                            s.constellationName = "GPS";
                            s.constellationAbr = "GP";
                            s.svidRange = { min: 1, max: 32 };
                        } else
                            if (s.gnssid === 4) {
                                s.constellationName = "IMES";
                                s.constellationAbr = "IM";
                                s.svidRange = { min: 1, max: 10 };
                            } else
                                if (s.gnssid === 7) {
                                    s.constellationName = "NavIC (IRNSS)";
                                    s.constellationAbr = "IR";
                                    s.svidRange = { min: 1, max: 11 };
                                } else
                                    if (s.gnssid === 5) {
                                        s.constellationName = "QZSS";
                                        s.constellationAbr = "QZ";
                                        s.svidRange = { min: 1, max: 7 };
                                    } else
                                        if (s.gnssid === 1) {
                                            s.constellationName = "SBAS";
                                            s.constellationAbr = "SB";
                                            s.svidRange = { min: 120, max: 158 };
                                        }
        }

    satteliteReading = { time: new Date(), item: sky };
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
        res.json(version );
    });

    app.get('/point/clearCache', (req, res) => {
        pointReadings.splice(0, pointReadings.length);
        // satteliteReadings.splice(0, satteliteReadings.length);

        res.json({
            points: pointReadings.length,
            // satellites: satteliteReadings.length,
        });
    });

    app.get('/recent', (req, res) => {
        let readings = {
            point: pointReadings.length !== 0 ? pointReadings[pointReadings.length - 1] : undefined,
            // satellites: satteliteReadings.length !== 0 ? satteliteReadings[satteliteReadings.length - 1] : undefined,
        }
        res.json(readings);
    });

    app.get('/point', (req, res) => {
        res.json(pointReadings.length !== 0 ? pointReadings[pointReadings.length - 1] : null);
    });

    app.get('/points', (req, res) => {
        console.log(pointReadings.length);

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
        res.json(satteliteReading);
    });


    app.get('/all', (req, res) => {
        res.json({ points: pointReadings, satellites: satteliteReading });
    });
}

function addNewItemToCache(cache, item) {
    // Find if it is duplicated...
    let duplicateFound = cache.find(i => 
        i.item.time === item.time && 
        i.item.lat === item.lat && 
        i.item.lon === item.lon);
    // console.log({ item, duplicateFound });

    if(duplicateFound)
        return;

    let now = new Date();
    cache.push({ time: now, item: item });
    let expiresOn = new Date(now - settings.cache.retentionSec * 1000);
    for (let p of cache) {
        if (p.time <= expiresOn)
            cache.shift();
        else
            break;
    }
}
