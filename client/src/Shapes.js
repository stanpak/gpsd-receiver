import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";

export default function Shapes() {

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <p className="CardTitle"><strong>Shapes</strong></p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>

          <div style={{ display: "flex", flexDirection: "column", height: 300, width: 500, flex: 5, marginRight: 20 }}>
          [shape list]
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>

            <Button text="New Shape" style={{ marginBottom: 2, marginTop: 2 }}
              onClick={async () => {
                await fetch('http://localhost:4000/shape/create');
              }} />

          </div>
        </div>
      </div>
    </Card>
  );
}

