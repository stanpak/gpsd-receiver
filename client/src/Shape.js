import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  LineSeries,
  MarkSeries
} from "react-vis";

export default function Shape() {

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <p className="CardTitle"><strong>Shape</strong></p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>

          <div style={{ display: "flex", flexDirection: "column", height: 300, width: 500, flex: 5, marginRight: 20 }}>
            <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <MarkSeries
        style={{
          strokeWidth: '3px'
        }}
        // lineStyle={{stroke: 'red'}}
        // markStyle={{stroke: 'blue'}}
        // color="red"
        size={5}
        // fill="yellow"
        data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 1.5, y: 15}]}
      />
      <LineSeries
        style={{
          strokeWidth: '3px'
        }}
        // lineStyle={{stroke: 'red'}}
        // markStyle={{stroke: 'blue'}}
        // color="red"
        // size={10}
        // fill="yellow"
        opacity={0.1}
        stroke="black"
        data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 1.5, y: 15}]}
      />
      {/* <LineMarkSeries
        className="linemark-series-example-2"
        curve={'curveMonotoneX'}
        data={[{x: 1, y: 11}, {x: 1.5, y: 29}, {x: 3, y: 7}, {x: 2, y: 7}]}
      /> */}
    </XYPlot>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>

            <Button text="Save Point" style={{ marginBottom: 2, marginTop: 2 }}
              onClick={async () => {
                await fetch('http://localhost:4000/point/save');
              }} />

          </div>
        </div>
      </div>
    </Card>
  );
}

