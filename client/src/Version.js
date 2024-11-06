import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";

export default function Version() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/version');
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
          <div className="CardTitle"><strong>Version</strong></div>
        </div>
        
        {!data ?
          <div>Loading...</div>
          :
          <div style={{ display: "flex", flexDirection: "row" , paddingTop: 2, paddingBottom: 0 }}>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>Public release level</span>}>
                <div className="ParamTitle">release:</div>
              </Tooltip>
              <div className="ParamValue">{data.release}</div>
            </div>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>Internal revision-control level.</span>}>
                <div className="ParamTitle">revision:</div>
              </Tooltip>
              <div className="ParamValue">{data.rev}</div>
            </div>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>API major revision level.</span>}>
                <div className="ParamTitle">proto major:</div>
              </Tooltip>
              <div className="ParamValue">{data.proto_major}</div>
            </div>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>API minor revision level.</span>}>
                <div className="ParamTitle">proto minor:</div>
              </Tooltip>
              <div className="ParamValue">{data.proto_minor}</div>
            </div>

            <div className="ParamSegment" style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip content={<span>URL of the remote daemon reporting this version. If empty, this is the version of the local daemon.</span>}>
                <div className="ParamTitle">remote:</div>
              </Tooltip>
              <div className="ParamValue">{data.remote}</div>
            </div>
          </div>
        }
      </div>
    </Card>
  );
}

