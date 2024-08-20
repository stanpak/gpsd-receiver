import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";

export default function Settings() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/settings');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "row", alignItems:"baseline"}}>
        <div style={{ display: "flex", flexDirection: "row", paddingRight:20,  }}>
          <div className="CardTitle"><strong>Settings</strong></div>
        </div>

        {!data ?
          <p>Loading...</p>
          :
          <div style={{ display: "flex", flexDirection: "row", paddingTop: 2, paddingBottom: 0 }}>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>host name</span>}>
                <div className="ParamTitle">host:</div>
              </Tooltip>
              <div className="ParamValue">{data.gpsd.host}</div>
            </div>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>TODO</span>}>
                <div className="ParamTitle">port:</div>
              </Tooltip>
              <div className="ParamValue">{data.gpsd.port}</div>
            </div>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>TODO</span>}>
                <div className="ParamTitle">retention:</div>
              </Tooltip>
              <div className="ParamValue">{data.cache.retentionMinutes}</div>
            </div>
          </div>
        }
      </div>
    </Card>
  );
}

