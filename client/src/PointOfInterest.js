import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";

export default function PointOfInterest() {

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "row", alignItems:"baseline" }}>

        <div style={{ display: "flex", flexDirection: "row",paddingRight:20,   }}>
          <div className="CardTitle" style={{ flex: 1, }}><strong>Point of Interest</strong></div>
          
        </div>
        
        <p>compass</p>
        <p>map</p>
        <p>name + coordinates + alt + distance</p>
      </div>
    </Card>
  );
}

