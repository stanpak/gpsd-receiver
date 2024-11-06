import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";

export default function CurrentPosition() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/position/getCurrent');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000); // Refresh every 1 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
          <div className="CardTitle" style={{ flex:1, }}><strong>Current Position</strong></div>

          <Button text="Save as Point" style={{ marginBottom: 2, marginTop: 2 }}
                onClick={async () => {
                  await fetch('http://localhost:4000/point/clearCache');
                }} />

        </div>

        {!data ?
          <div>Loading...</div>
          :
          <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>

            {/* Row #1 */}
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 2 }}>
                <Tooltip content={<span>Name of originating device</span>}>
                  <div className="ParamTitle">device:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.device}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>NMEA mode:<br />
                  0=unknown,<br />
                  1=no fix,<br />
                  2=2D,<br />
                  3=3D.</span>}>
                  <div className="ParamTitle">mode:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.mode}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Altitude, height above ellipsoid, in meters. Probably WGS84.</span>}>
                  <div className="ParamTitle">altHAE:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.altHAE}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Horizontal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get a circular error estimate.</span>}>
                  <div className="ParamTitle">hdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.hdop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>MSL Altitude in meters. The geoid used is rarely specified and is often inaccurate. See the comments below on geoidSep. altMSL is altHAE minus geoidSep.</span>}>
                  <div className="ParamTitle">altMSL:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.altMSL}</div>
              </div>

            </div>

            {/* Row #2 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Current datum. Hopefully WGS84.</span>}>
                  <div className="ParamTitle">datum:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.datum}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Depth in meters. Probably depth below the keel…​</span>}>
                  <div className="ParamTitle">depth:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.depth}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Age of DGPS data. In seconds</span>}>
                  <div className="ParamTitle">dgpsAge:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.dgpsAge}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Station of DGPS data.</span>}>
                  <div className="ParamTitle">dgpsSta:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.dgpsSta}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  Longitudinal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get an error estimate. A.k.a. Northing DOP.</span>}>
                  <div className="ParamTitle">xdop:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.xdop}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF X position in meters.</span>}>
                  <div className="ParamTitle">ecefx:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefx}</div>
              </div>

            </div>

            {/* Row #3 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF Y position in meters.</span>}>
                  <div className="ParamTitle">ecefy:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefy}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF Z position in meters.</span>}>
                  <div className="ParamTitle">ecefz:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefz}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF position error in meters. Certainty unknown.</span>}>
                  <div className="ParamTitle">ecefpAcc:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefpAcc}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF X velocity in meters per second.​</span>}>
                  <div className="ParamTitle">ecefvx:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefvx}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF Y velocity in meters per second.</span>}>
                  <div className="ParamTitle">ecefvy:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefvy}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF Z velocity in meters per second.</span>}>
                  <div className="ParamTitle">ecefvz:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefvz}</div>
              </div>

            </div>

            {/* Row #4 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Estimated track (direction) error in degrees. Certainty unknown.</span>}>
                  <div className="ParamTitle">epd:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.epd}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Estimated horizontal Position (2D) Error in meters. Also known as Estimated Position Error (epe). Certainty unknown.</span>}>
                  <div className="ParamTitle">eph:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.eph}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Estimated speed error in meters per second. Certainty unknown.</span>}>
                  <div className="ParamTitle">eps:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.eps}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  Estimated time stamp error in seconds. Certainty unknown.</span>}>
                  <div className="ParamTitle">ept:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ept}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  Longitude error estimate in meters. Certainty unknown.</span>}>
                  <div className="ParamTitle">epx:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.epx}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Latitude error estimate in meters. Certainty unknown.</span>}>
                  <div className="ParamTitle">epy:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.epy}</div>
              </div>

            </div>

            {/* Row #5 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Jamming Indicator
                  0 (no jamming) to 255 (severe jamming). -1 means unset.</span>}>
                  <div className="ParamTitle">jam:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.jam}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Latitude in degrees: +/- signifies North/South.</span>}>
                  <div className="ParamTitle">lat:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.lat}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Current leap seconds.</span>}>
                  <div className="ParamTitle">leapseconds:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.leapseconds}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Longitude in degrees: +/- signifies East/West.​</span>}>
                  <div className="ParamTitle">lon:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.lon}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Course over ground, degrees magnetic.</span>}>
                  <div className="ParamTitle">magtrack:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.magtrack}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Magnetic variation, degrees. Also known as the magnetic declination (the direction of the horizontal component of the magnetic field measured clockwise from north) in degrees, Positive is West variation. Negative is East variation.</span>}>
                  <div className="ParamTitle">magvar:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.magvar}</div>
              </div>

            </div>

            {/* Row #6 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>
                  North component of relative position vector in meters.</span>}>
                  <div className="ParamTitle">relN:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.relN}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Estimated Spherical (3D) Position Error in meters. Guessed to be 95% confidence, but many GNSS receivers do not specify, so certainty unknown.</span>}>
                  <div className="ParamTitle">sep:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.sep}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Speed over ground, meters per second.</span>}>
                  <div className="ParamTitle">speed:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.speed}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>GPS fix status:<br />
                  0=Unknown,<br />
                  1=Normal,<br />
                  2=DGPS,<br />
                  3=RTK Fixed,<br />
                  4=RTK Floating,<br />
                  5=DR,<br />
                  6=GNSSDR,<br />
                  7=Time (surveyed),<br />
                  8=Simulated,<br />
                  9=P(Y)​</span>}>
                  <div className="ParamTitle">status:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.status}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Receiver temperature in degrees Celsius.</span>}>
                  <div className="ParamTitle">temp:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.temp}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Time/date stamp in ISO8601 format, UTC. May have a fractional part of up to .001sec precision. May be absent if the mode is not 2D or 3D. May be present, but invalid, if there is no fix. Verify 3 consecutive 3D fixes before believing it is UTC. Even then it may be off by several seconds until the current leap seconds is known.</span>}>
                  <div className="ParamTitle">time:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.time}</div>
              </div>

            </div>

            {/* Row #7 */}
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>East velocity component in meters.</span>}>
                  <div className="ParamTitle">velE:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.velE}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>North velocity component in meters.</span>}>
                  <div className="ParamTitle">velN:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.velN}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Wind angle magnetic in degrees.</span>}>
                  <div className="ParamTitle">wanglem:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.wanglem}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Wind angle relative in degrees.​</span>}>
                  <div className="ParamTitle">wangler:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.wangler}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Wind angle true in degrees.</span>}>
                  <div className="ParamTitle">wanglet:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.wanglet}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Wind speed relative in meters per second.</span>}>
                  <div className="ParamTitle">wspeedr:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.wspeedr}</div>
              </div>

            </div>

            {/* Row #8 */}
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Antenna Status:
                  2=Short,
                  3=Open.</span>}>
                  <div className="ParamTitle">ant:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ant}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Climb (positive) or sink (negative) rate, meters per second.</span>}>
                  <div className="ParamTitle">climb:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.climb}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Offset of local GNSS clock relative to UTC, in ns. AKA Clock Offset. Sometimes given as Part Per Billion (ppb) which is the same as ns.</span>}>
                  <div className="ParamTitle">clockbias:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.clockbias}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>The rate at which the local clock is drifting. In ns/s.</span>}>
                  <div className="ParamTitle">clockdrift:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.clockdrift}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>ECEF velocity error in meters per second. Certainty unknown.</span>}>
                  <div className="ParamTitle">ecefvAcc:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.ecefvAcc}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Estimated climb error in meters per second. Certainty unknown.</span>}>
                  <div className="ParamTitle">epc:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.epc}</div>
              </div>

            </div>

            {/* Row #9 */}
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Estimated vertical error in meters. Certainty unknown.</span>}>
                  <div className="ParamTitle">epv:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.epv}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Geoid separation is the difference between the WGS84 reference ellipsoid and the geoid (Mean Sea Level) in meters. Almost no GNSS receiver specifies how they compute their geoid. gpsd interpolates the geoid from a 5x5 degree table of EGM2008 values when the receiver does not supply a geoid separation. The gpsd computed geoidSep is usually within one meter of the "true" value, but can be off as much as 12 meters.</span>}>
                  <div className="ParamTitle">geoidSep:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.geoidSep}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Down component of relative position vector in meters.</span>}>
                  <div className="ParamTitle">relD:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.relD}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>East component of relative position vector in meters.</span>}>
                  <div className="ParamTitle">relE:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.relE}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Course over ground, degrees from true north.</span>}>
                  <div className="ParamTitle">track:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.track}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Down velocity component in meters.</span>}>
                  <div className="ParamTitle">velD:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.velD}</div>
              </div>

            </div>

            {/* Row #10 */}
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Wind speed true in meters per second.</span>}>
                  <div className="ParamTitle">wspeedt:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.wspeedt}</div>
              </div>

              <div className="ParamSegment" style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Tooltip content={<span>Water temperature in degrees Celsius.</span>}>
                  <div className="ParamTitle">wtemp:</div>
                </Tooltip>
                <div className="ParamValue">{data.item.wtemp}</div>
              </div>

            </div>
          </div>
        }
      </div>
    </Card>
  );
}

