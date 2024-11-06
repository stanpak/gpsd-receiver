import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import CollectionOnMap from "./CollectionOnMap";

export default function Collection() {

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
          <div className="CardTitle"  style={{ flex: 1, }}><strong>Selected Collection</strong></div>

          <Button text="New Point" style={{ marginBottom: 2, marginTop: 2 }}
                onClick={async () => {}} />
        </div>

        <p>List of points: name, lat+long+alt</p>


        <p>Select point</p>
        <p>Edit point properties</p>
        <p>delete point</p>

      </div>
    </Card>
  );
}

