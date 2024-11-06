import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { XYPlot, XAxis, YAxis, MarkSeries, CircularGridLines, LabelSeries, MarkSeriesCanvas } from "react-vis";

// https://uber.github.io/react-vis/documentation/welcome-to-react-vis

const margin = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
};

const palette =[
  "red","green", "blue","yellow", "brown","gray"
];

const WIDTH = 600;
const HEIGHT = 600;

function deg2rad(x) {
  return x * Math.PI / 180;
}

function satColor(gnssid) {
  return gnssid;
}

export default function SatellitesPosition({ satellites }) {
  const data = [];
  for (let s of satellites) {
    if(s.az && s.el)
    data.push({
      r: 90 - s.el,
      theta: deg2rad(90 - s.az),
      size: 1 + s.ss ,
      label: s.PRN,
      color: satColor(s.gnssid),
      // fill: "green",
      // color: "blue",
      // stroke: 7,

    });
  }
  // console.log({satellites, data});

  return (
    <Card interactive={false} elevation={Elevation.ONE} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
          <p className="CardTitle"><strong>Satellites Position</strong></p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
          <XYPlot
            margin={margin}
            xDomain={[-90, 90]}
            yDomain={[-90, 90]}
            width={WIDTH}
            height={HEIGHT}
          >
            <XAxis top={(HEIGHT - margin.top) / 2} />
            <YAxis left={(WIDTH - margin.left - margin.right) / 2} />
            <MarkSeries
              // strokeWidth={0}
              // size={3}
              sizeRange={[2, 20]}
              // colorType="literal"
              data={data.map(row => ({
                ...row,
                x: Math.cos(row.theta) * row.r,
                y: Math.sin(row.theta) * row.r
              }))}
            />
            <LabelSeries
              animation
              allowOffsetToBeReversed
              data={data.map(row => ({
                ...row,
                x: Math.cos(row.theta) * row.r,
                y: Math.sin(row.theta) * row.r
              }))}
            />
          </XYPlot>
        </div>
      </div>
    </Card>
  );
}

