import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";


export default function Satellites() {

  const [data, setData] = useState(null);

  const interval = setInterval(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/satellites');
        const result = await response.json();
        setData(result);
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
          <div className="CardTitle"><strong>Satellites</strong></div>
        </div>

        {!data ?
          <div>Loading...</div>
          :
          <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>

            {/* Row #1 */}
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 3 }}>
                <Tooltip content={<span>Time/date stamp in ISO8601 format, UTC. May have a fractional part of up to .001sec precision.</span>}>
                  <div className="ParamTitle">time:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.time}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Number of satellite objects in "satellites" array.</span>}>
                  <div className="ParamTitle">nSat:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.nSat}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  Geometric (hyperspherical) dilution of precision, a combination of PDOP and TDOP. A dimensionless factor which should be multiplied by a base UERE to get an error estimate.</span>}>
                  <div className="ParamTitle">gdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.gdop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Horizontal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get a circular error estimate.</span>}>
                  <div className="ParamTitle">hdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.hdop}</div>
              </div>

            </div>

            {/* Row #2 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 2 }}>
                <Tooltip content={<span>Name of originating device</span>}>
                  <div className="ParamTitle">device:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.device}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Pseudorange residue, in meters.</span>}>
                  <div className="ParamTitle">prRes:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.prRes}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  Quality Indicator
                  0=no signal
                  1=searching signal
                  2=signal acquired
                  3=signal detected but unusable
                  4=code locked and time synchronized
                  5, 6, 7=code and carrier locked and time synchronized</span>}>
                  <div className="ParamTitle">qual:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.qual}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Time dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get an error estimate.</span>}>
                  <div className="ParamTitle">tdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.tdop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Number of satellites used in navigation solution.</span>}>
                  <div className="ParamTitle">uSat:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.uSat}</div>
              </div>

            </div>

            {/* Row #3 */}
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Pseudorange, in meters.</span>}>
                  <div className="ParamTitle">pr:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.pr}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Pseudorange Rate of Change, in meters / second.</span>}>
                  <div className="ParamTitle">prRate:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.prRate}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  Longitudinal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get an error estimate. A.k.a. Northing DOP.</span>}>
                  <div className="ParamTitle">xdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.xdop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Latitudinal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get an error estimate. A.k.a. Easting DOP.</span>}>
                  <div className="ParamTitle">ydop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ydop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Vertical (altitude) dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get an error estimate.</span>}>
                  <div className="ParamTitle">vdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.vdop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Position (spherical/3D) dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get an error estimate.</span>}>
                  <div className="ParamTitle">pdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.pdop}</div>
              </div>

            </div>

            {data.item.satellites && <div>
              <div style={{ display: "flex", flexDirection: "row", }}>
                <div className="ParamTitle"><strong>Satellites:</strong></div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>PRN</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>az</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>el</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>freqid</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>gnssid</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>health</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>ss</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>sigid</div>
                  </Tooltip>

                  <Tooltip content={<span>desc</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>svid</div>
                  </Tooltip>

                  <Tooltip content={<span>used</span>}>
                    <div className="ParamTitle" style={{ flex: 1 }}>used</div>
                  </Tooltip>
                </div>

                {data.item.satellites.map((v, i) => {
                  // console.log({v});
                  return <div key={v.PRN} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.PRN}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.az.toFixed(2)}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.el.toFixed(2)}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.freqid}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.gnssid}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.health}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.ss}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.sigid}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.svid}</div>
                    <div className="ParamValue" style={{ flex: 1 }}>{v.used}</div>
                  </div>
                })}
              </div>
            </div>
            }
          </div>
        }
      </div>
    </Card>
  );
}

