import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

// https://en.wikipedia.org/wiki/Haversine_formula
function measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
}

export default function Points() {

  const [data, setData] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
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
    // Initial fetch
    fetchData();

    const intervalId = setInterval(fetchData, 3000); // Refresh every 1 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  let errorRadiusM;
  if (data) {
    // Calculate the difference between the center of the series (mean) and the standard deviation into meters...
    let lon = data.lonMean;
    let lat = data.latMean;

    let lonSD = data.lonMean + data.lonStdDev;
    let latSD = data.latMean + data.latStdDev;

    errorRadiusM = measure(lon, lat, lonSD, latSD);
    // console.log({errorRadiusM});
  }


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

            {/* Chart */}
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
                  legend: 'Latitude',
                  legendPosition: 'middle',
                  // legendOffset: 46,
                  truncateTickAt: 0
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Longitude',
                  legendPosition: 'middle',
                  // legendOffset: -60,
                  truncateTickAt: 0
                }}
              />
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", flex: 3, alignItems: "flex-start" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", }}>
                <div style={{ flex: 1, }}>
                  <Tooltip content={<span>Number of samples</span>}>
                    <p className="ParamTitle" style={{ flex: 1 }}>samples:</p>
                  </Tooltip>
                </div>
                <div style={{ flex: 1, }}>
                  <p className="ParamValue">{data.points.length}</p>
                </div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, }}>
                  <Tooltip content={<span>qqq</span>}>
                    <p className="ParamTitle">lat mean:</p>
                  </Tooltip>
                </div>
                <div style={{ flex: 1, }}>
                  <p className="ParamValue">{data.latMean ? data.latMean.toFixed(10) : ""}</p>
                </div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, }}>
                  <Tooltip content={<span>qqq</span>}>
                    <p className="ParamTitle">lat stddev:</p>
                  </Tooltip>
                </div>
                <div style={{ flex: 1, }}>
                  <p className="ParamValue">{data.latStdDev ? data.latStdDev.toFixed(10) : ""}</p>
                </div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, }}>
                  <Tooltip content={<span>qqq</span>}>
                    <p className="ParamTitle">lon mean:</p>
                  </Tooltip>
                </div>
                <div style={{ flex: 1, }}>
                  <p className="ParamValue">{data.lonMean ? data.lonMean.toFixed(10) : ""}</p>
                </div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, }}>
                  <Tooltip content={<span>qqq</span>}>
                    <p className="ParamTitle">lon stddev:</p>
                  </Tooltip>
                </div>
                <div style={{ flex: 1, }}>
                  <p className="ParamValue">{data.lonStdDev ? data.lonStdDev.toFixed(10) : ""}</p>
                </div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, }}>
                  <Tooltip content={<span>qqq</span>}>
                    <p className="ParamTitle">error radius (std dev):</p>
                  </Tooltip>
                </div>
                <div style={{ flex: 1, }}>
                  <p className="ParamValue">{errorRadiusM ? errorRadiusM.toFixed(2) : ""} m</p>
                </div>
              </div>

              <Button text="Clear Sequence" style={{ marginBottom: 2, marginTop: 2 }}
                onClick={async () => {
                  await fetch('http://localhost:4000/point/clearCache');
                }} />

              <Button text="Save Point" style={{ marginBottom: 2, marginTop: 2 }}
                onClick={async () => {
                  await fetch('http://localhost:4000/point/clearCache');
                }} />

              <Button text="Copy Coordinates" style={{ marginBottom: 2, marginTop: 2 }}
                onClick={() => { navigator.clipboard.writeText(data.latMean+ "," + data.lonMean); }} />

            </div>
          </div>
        }
      </div>
    </Card>
  );
}

