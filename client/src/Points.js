import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

export default function Points() {

  const [data, setData] = useState(null);
  const [points, setPoints] = useState(null);

  const interval = setInterval(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/points');
        const result = await response.json();
        setData(result);

        if (result) {
          const points = [{
            id: "point",
            color: "hsl(321, 70%, 50%)",
            data: result.points.map(v => { return { x: v.item.lat, y: v.item.lon, point: v } }),
          }];

          setPoints(points);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, 1000);

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <p className="CardTitle"><strong>Recent Points</strong></p>
        </div>

        {!data ?
          <p>Loading...</p>
          :
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>

            <div style={{ display: "flex", flexDirection: "column", height: 300, flex: 5, marginRight: 20 }}>
              <ResponsiveScatterPlot
                data={points}
                nodeSize={(n) => {
                  // console.log({n});
                  return (n.data.point.item.epx + n.data.point.item.epx);
                }}
                margin={{ top: 10, right: 10, bottom: 30, left: 90 }}
                xScale={{ type: 'linear', min: "auto", max: 'auto' }}
                xFormat=">-.2f"
                yScale={{ type: 'linear', min: "auto", max: 'auto' }}
                yFormat=">-.2f"
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'weight',
                  legendPosition: 'middle',
                  // legendOffset: 46,
                  truncateTickAt: 0
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'size',
                  legendPosition: 'middle',
                  // legendOffset: -60,
                  truncateTickAt: 0
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 2, }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 3 }}>
                <Tooltip content={<span>qqq</span>}>
                  <p className="ParamTitle">lat mean:</p>
                </Tooltip>
                <p className="ParamValue">{data.latMean.toFixed(10)}</p>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 3 }}>
                <Tooltip content={<span>qqq</span>}>
                  <p className="ParamTitle">lat stddev:</p>
                </Tooltip>
                <p className="ParamValue">{data.latStdDev.toFixed(10)}</p>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 3 }}>
                <Tooltip content={<span>qqq</span>}>
                  <p className="ParamTitle">lon mean:</p>
                </Tooltip>
                <p className="ParamValue">{data.lonMean.toFixed(10)}</p>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 3 }}>
                <Tooltip content={<span>qqq</span>}>
                  <p className="ParamTitle">lon stddev:</p>
                </Tooltip>
                <p className="ParamValue">{data.lonStdDev.toFixed(10)}</p>
              </div>

              <Button text="Clear Sequence" style={{ marginBottom: 2, marginTop: 2 }}
                onClick={async () => {
                  await fetch('http://localhost:4000/point/clearCache');
                }} />

            </div>
          </div>
        }
      </div>
    </Card>
  );
}

