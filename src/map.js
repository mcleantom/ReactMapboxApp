import * as React from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapView() {
  const geoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [-27.10971049842982, 27.518651550220667],
              [-64.59489018072507, 33.55452026011406],
              [-64.76409416391317, 24.050389701247767],
              [-56.02861846587706, 13.575633247486337],
              [-29.056347378355326, 14.13341194873479],
              [-27.10971049842982, 27.518651550220667],
            ],
          ],
          type: "Polygon",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [0, 0],
            [90, 0],
            [180, 0],
            [250, 0],
          ],
        },
        properties: {},
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  const polyStyle = {
    id: "water",
    type: "fill",
    paint: {
      "fill-color": "#00ffff",
    },
  };

  return (
    <Map
      id="mymap"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      projection="globe"
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoibWNsZWFudG9tIiwiYSI6ImNrbnpwdHl1NzA3emcydWs0bWo5eDd6bWUifQ.kIbKttak75jGJ3a8Gt7swQ"
    >
      <Source type="geojson" data={geoJSON}>
        <Layer {...layerStyle} />
        <Layer {...polyStyle} />
      </Source>
    </Map>
  );
}
