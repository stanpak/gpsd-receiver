import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/style.css";
import './Map.css';


// https://cloud.maptiler.com/maps/
// https://docs.maptiler.com/sdk-js/api/

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tokyo = { lng: -111.6891492409836, lat: 33.47063811967213 };

    const zoom = 20;
    maptilersdk.config.apiKey = 'LGPhV7z0fLr3niB3hp3x';

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.SATELLITE,
            center: [tokyo.lng, tokyo.lat],
            zoom: zoom
        });

        map.current.on('load', function () {
            //first add the source with the "route" id to the map
            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[-122.48369693756104, 37.83381888486939], [-122.48348236083984, 37.83317489144141], [-122.48339653015138, 37.83270036637107], [-122.48356819152832, 37.832056363179625], [-122.48404026031496, 37.83114119107971], [-122.48404026031496, 37.83049717427869], [-122.48348236083984, 37.829920943955045], [-122.48356819152832, 37.82954808664175], [-122.48507022857666, 37.82944639795659], [-122.48610019683838, 37.82880236636284], [-122.48695850372314, 37.82931081282506], [-122.48700141906738, 37.83080223556934], [-122.48751640319824, 37.83168351665737], [-122.48803138732912, 37.832158048267786], [-122.48888969421387, 37.83297152392784], [-122.48987674713133, 37.83263257682617], [-122.49043464660643, 37.832937629287755], [-122.49125003814696, 37.832429207817725], [-122.49163627624512, 37.832564787218985], [-122.49223709106445, 37.83337825839438], [-122.49378204345702, 37.83368330777276]]
                    }
                }
            });

            //then add the layer to the map. Display the "route" source data
            map.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#888',
                    'line-width': 8
                }
            });
        });


        // // https://docs.maptiler.com/sdk-js/api/markers/
        // const marker = new maptilersdk.Marker({
        //     color: "red",
        //     opacity: .7,
        //     // scale:.5,
        //     // draggable: true
        // })
        //     .setLngLat([tokyo.lng, tokyo.lat])
        //     .addTo(map.current);

        // const currentPostMarker = new maptilersdk.Marker({
        //     color: "Blue",
        //     opacity: .7,
        //     // scale:.5,
        //     // draggable: true
        // })
        //     .setLngLat([tokyo.lng + 0.0001, tokyo.lat])
        //     .addTo(map.current);

        //             //first add the source with the "square" id to the map
        // map.current.addSource('square', {
        //     type: 'geojson',
        //     data: {
        //       "type": "FeatureCollection",
        //       "features": [
        //         {
        //           "type": "Feature",
        //           "properties": {},
        //           "geometry": {
        //             "coordinates": [[[-2.2240348228768596, 45.20404531546535], [-2.2240348228768596, 38.55848603574671], [7.2012758848702845, 38.55848603574671], [7.2012758848702845, 45.20404531546535], [-2.2240348228768596, 45.20404531546535]]],
        //             "type": "Polygon"
        //           }
        //         }
        //       ]
        //     }
        //   });

        //   //then add the layer to the map. Display the "square" source data
        //   map.current.addLayer({
        //     "id": "square-region",
        //     "source": "square",
        //     "type": "fill",
        //     "paint": {
        //       "fill-color": "#00ffff"
        //     }
        //   });

    }, [tokyo.lng, tokyo.lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}