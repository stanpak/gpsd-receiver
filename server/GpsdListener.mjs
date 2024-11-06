import gpsd from "node-gpsd";
import { settings } from "./settings.mjs";
import { mean, standardDeviation } from "simple-statistics";
import { v4 as uuidv4 } from 'uuid';

// https://gpsd.gitlab.io/gpsd/gpsd_json.html

// Simple Statistics:
// https://simple-statistics.github.io/docs/


export default class GpsdListener {

    // This is the collection of the readings from the gpsd of the points "TPV".
    pointReadings = [];

    // This is the collection of the readings from the gpsd of the sattelites "SKY".
    satteliteReading;

    version;

    listener;

    devices;

    onSky = (sky) => {
        // console.log({ sky });
        if (sky.satellites) {
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

            this.satteliteReading = { time: new Date(), item: sky };
        }
    }

    onTpv = (data)=>{
            // console.log("TPV", new Date());
            this.addNewItemToCache(this.pointReadings, data);
    }

    initialize() {
        this.listener = new gpsd.Listener({
            port: settings.port,
            hostname: settings.host,
            logger: {
                info: () => { },
                warn: console.warn,
                error: console.error
            },
            parse: true
        });

        this.listener.on('TPV', this.onTpv);
        this.listener.on('SKY', this.onSky);

        this.listener.on('INFO', info => {
            // console.log({ info });
        });

        this.listener.on('DEVICE', device => {
            // console.log({ device });
        });

        this.listener.on('DEVICES', devices => {
            // console.log({ devices: devices.devices });
            this.devices= devices.devices;
        });

        this.listener.on('VERSION', data => {
            // console.log({ data });
            this.version = data;
        });

        this.listener.on('WATCH', data => {
            // console.log({ data });
        });

        this.listener.on('POLL', poll => {
            // console.log({ poll });
        });

        this.listener.connect(() => {
            console.log('Connected to teh GPS Receiver.');

            // Query the device for specific information...
            this.listener.version();
            this.listener.devices();
            this.listener.device();

            // listener.poll();
            this.listener.watch({ class: 'WATCH', nmea: false, json: true });
        });
    }

    addNewItemToCache(cache, item) {
        // Find if it is duplicated...
        let duplicateFound = cache.find(i =>
            i.item.time === item.time &&
            i.item.lat === item.lat &&
            i.item.lon === item.lon);
        // console.log({ item, duplicateFound });

        if (duplicateFound)
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

    getRecentPositions(){
        if (this.pointReadings.length !== 0) {
            let latArr = this.pointReadings.map(v => v.item.lat);
            let lonArr = this.pointReadings.map(v => v.item.lon);

            return  {
                latMean: mean(latArr),
                lonMean: mean(lonArr),
                latStdDev: standardDeviation(latArr),
                lonStdDev: standardDeviation(lonArr),
                points: this.pointReadings,
            }
        } 
        return null;
    }

    getCurrentPosition(){
        return this.pointReadings.length !== 0 ? this.pointReadings[this.pointReadings.length - 1] : null;
    }

    clearCache(){
        this.pointReadings.splice(0, this.pointReadings.length);
    }

    getSatellites(){
        return this.satteliteReading;
    }
}

export const gpsdListener = new GpsdListener();

