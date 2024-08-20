import './App.css';
import Settings from './Settings';
import Version from './Version';
import Satellites from './Satellites';
import Point from './Point';
import Points from './Points';
import Shape from './Shape';
import SatellitesPosition from './SatellitesPosition';
import { Tab, Tabs, TabsExpander } from "@blueprintjs/core";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row", paddingLeft: 10 }}>
        <h2>GPS Data Visualizer (gpsd)</h2>
      </div>


      <Tabs id="TabsExample">
        <Tab id="ng" title="Satellites" panel={
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
              <Satellites />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <SatellitesPosition />
            </div>
          </div>
        } />
        <Tab id="mb" title="Position" panel={
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
              <Points />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
              <Point />
            </div>
          </div>
        } panelClassName="ember-panel" />
        <Tab id="rx" title="Shapes" panel={
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
              <Shape />
            </div>
          </div>
        } />
        {/* <TabsExpander />
        <input className="bp5-input" type="text" placeholder="Search..." /> */}
      </Tabs>


      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Settings />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Version />
        </div>
      </div>
    </div>
  );
}

export default App;
