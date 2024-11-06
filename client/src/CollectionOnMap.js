import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import Map from './components/Map.jsx';

// https://visgl.github.io/react-google-maps/docs/get-started

// Google API keys:
// https://developers.google.com/maps/documentation/javascript/get-api-key

export default function CollectionOnMap() {

  return (
    <Card interactive={false} elevation={Elevation.ONE} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
          <div className="CardTitle"><strong>Map</strong></div>
        </div>

        <Map />

      </div>
    </Card>
  );
}

