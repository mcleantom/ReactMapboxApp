import logo from "./logo.svg";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProvider } from "react-map-gl";
import Map from "./map";
import ControlPlane from "./ControlPlane";
import { ChakraProvider, Flex, ColorModeScript } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript />
      <MapProvider>
        <Flex>
          <ControlPlane />
          <Map />
        </Flex>
      </MapProvider>
    </ChakraProvider>
  );
}

export default App;
