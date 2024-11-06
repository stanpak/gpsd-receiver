import { Button, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import ListControl from "./components/ListControl";


function CollectionItem({ item }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignContent: "streatch" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems:"flex-start" }}>
        <div>{item.name}</div>
        <div>{item.description}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button minimal={true} icon="edit" />
        <Button minimal={true} icon="delete" />
      </div>
    </div>
  );
}

export default function CollectionList() {

  const collections = [{
    id: "coll1",
    name: "coll1", description: "desc"
  }];

  return (
    <Card interactive={false} elevation={Elevation.TWO} style={{ margin: 5 }} compact={true}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>

          <div className="CardTitle" style={{ flex: 1, }}><strong>Collections of Points</strong></div>

          <div style={{}}>
            <Button text="New Collection" style={{ marginBottom: 2, marginTop: 2 }}
              onClick={async () => {
                await fetch('http://localhost:4000/collection/create');
              }} />

          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", }}>
          <p>list of collections: name + type + number of points, area, length</p>

          <ListControl
            getItems={() => collections}
            renderItem={(p, index) => <CollectionItem item={p} container={this} />}
          />

          <p>Select collection</p>
          <p>Edit collection properties</p>
          <p>delete collection</p>
        </div>

      </div>
    </Card>
  );
}

