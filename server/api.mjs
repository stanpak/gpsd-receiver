import { gpsdListener } from "./GpsdListener.mjs";
import { settings } from "./settings.mjs";
import { mean, standardDeviation } from "simple-statistics";


export function registerApi(app) {

    app.get('/settings', (req, res) => {
        res.json(settings);
    });

    app.get('/version', (req, res) => {
        res.json(gpsdListener.version);
    });

    app.get('/devices', (req, res) => {
        res.json(gpsdListener.devices);
    });

    app.get('/satellites', (req, res) => {
        res.json(gpsdListener.getSatellites());
    });

    // POSITION

    app.get('/position/clearCache', (req, res) => {
        gpsdListener.clearCache();
    });

    app.get('/position/getCurrent', (req, res) => {
        res.json(gpsdListener.getCurrentPosition());
    });

    app.get('/position/getAllRecent', (req, res) => {
        res.json(gpsdListener.getRecentPositions());
    });

    // COLLECTION

    app.get('/collection/getAll', (req, res) => {
    });

    app.get('/collection/get', (req, res) => {
    });

    app.post('/collection/create', (req, res) => {
    });

    app.post('/collection/update', (req, res) => {
    });

    app.post('/collection/delete', (req, res) => {
    });


    // POINT

    app.post('/collection/point/create', (req, res) => {
    });

    app.post('/collection/point/update', (req, res) => {
    });

    app.post('/collection/point/delete', (req, res) => {
    });


    /**
     * Returns everything: recent position and sattellites, version and devices
     */
    app.get('/getAll', (req, res) => {
        res.json({
            recentPositions: gpsdListener.getRecentPositions(),
            satellites: gpsdListener.getSatellites(),
            devices: gpsdListener.devices,
            version: gpsdListener.version,
        });
    });
}
