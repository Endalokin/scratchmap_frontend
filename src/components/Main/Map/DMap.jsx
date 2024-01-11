// The URL on your server where CesiumJS's static files are hosted.
console.log("This is the 3d")
window.CESIUM_BASE_URL = "/node_modules/cesium/Build/Cesium"

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// Your access token can be found at: https://ion.cesium.com/tokens.
// This is the default access token from your ion account

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNWVjNGNlZC0wYjA4LTQ2YzctOTg4Yi1iNjE5Y2Y0YjI2MTciLCJpZCI6MTg5MjQ2LCJpYXQiOjE3MDUwMDAwOTF9.gM5cArNvUIXSrmyqm67gV-Q6QQei9l7HvtajJqZCtP4';



async function doIt() {
  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const viewer = new Viewer('cesiumContainer', {
    terrain: Terrain.fromWorldTerrain({
      requestVertexNormals: true,
    }),
  });
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer?.camera.flyTo({
    destination: Cartesian3.fromDegrees(-21, 64.4175, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    }
  });

  // Add Cesium OSM Buildings, a global 3D buildings layer.
/*   const buildingTileset = await createOsmBuildingsAsync();
  viewer?.scene.primitives.add(buildingTileset); */
}

export default function DMap() {

  return (
    <>
      <button onClick={doIt}>Doti</button >
      <div id="cesiumContainer" style={{position:"absolute", width:"70vw", height:"70vh", zIndex:"10", top:"15vh", left:"15vw"}}>3D-Map</div>

    </>
  )
}
