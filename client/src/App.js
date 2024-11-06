import './App.css';
import "leaflet/dist/leaflet.css";

import Settings from './Settings';
import Version from './Version';
import Satellites from './Satellites';
import CurrentPosition from './CurrentPosition';
import RecentPositions from './RecentPositions';
import Shape from './Shape';
import SatellitesPosition from './SatellitesPosition';
import { Tab, Tabs, TabsExpander } from "@blueprintjs/core";
import CollectionList from './CollectionList';
import CollectionOnMap from './CollectionOnMap';
import Collection from './Collection';
import PointOfInterest from './PointOfInterest';

function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/settings');
  //       const result = await response.json();
  //       setData(result);

  //     } catch (error) {
  //       console.error('Error fetching settings:', error);
  //     }
  //   };
  //   // Initial fetch
  //   fetchData();

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row", paddingLeft: 10 }}>
        <h2>GPS Data Visualizer (gpsd)</h2>
      </div>

      <div style={{ padding: 10 }}>
        <Tabs id="TabsExample">

          <Tab id="position" title="Position" panel={
            <div style={{ display: "flex", flexDirection: "row" }}>

              <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
                <CollectionList />
                <Collection />
                {/* <CollectionOnMap /> */}
                </div>

              <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
                <PointOfInterest />
                <RecentPositions />
                <CurrentPosition />
              </div>

            </div>
          } panelClassName="ember-panel" />

          <Tab id="satellites" title="Satellites" panel={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
                <Satellites />
              </div>
            </div>
          } />


          <Tab id="poi" title="POIs" panel={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
                <Shape />
              </div>
            </div>
          } />

          <Tab id="settings" title="Settings" panel={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <Settings />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <Version />
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* <TabsExpander />
        <input className="bp5-input" type="text" placeholder="Search..." /> */}
        </Tabs>
      </div>


    </div>
  );
}

export default App;
