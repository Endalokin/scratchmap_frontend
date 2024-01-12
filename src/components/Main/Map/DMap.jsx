// The URL on your server where CesiumJS's static files are hosted.
console.log("This is the 3d")
window.CESIUM_BASE_URL = "/node_modules/cesium/Build/Cesium"

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, ImageryLayer, IonWorldImageryStyle, Cartesian2, Color as CesiumColor, StripeMaterialProperty, CheckerboardMaterialProperty } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// Your access token can be found at: https://ion.cesium.com/tokens.
// This is the default access token from your ion account

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNWVjNGNlZC0wYjA4LTQ2YzctOTg4Yi1iNjE5Y2Y0YjI2MTciLCJpZCI6MTg5MjQ2LCJpYXQiOjE3MDUwMDAwOTF9.gM5cArNvUIXSrmyqm67gV-Q6QQei9l7HvtajJqZCtP4';



async function doIt() {
  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const viewer = new Viewer('cesiumContainer', {
    baseLayer: ImageryLayer.fromWorldImagery({
      style: IonWorldImageryStyle.AERIAL_WITH_LABELS,
    }),
    terrain: Terrain.fromWorldTerrain({
      requestVertexNormals: true,
    }),
  });
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer?.camera.flyTo({
    destination: Cartesian3.fromDegrees(-21.499795, 64.841967, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    }
  });

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = await createOsmBuildingsAsync();
  viewer?.scene.primitives.add(buildingTileset);

  const checkedMaterial = new CheckerboardMaterialProperty({
    evenColor: CesiumColor.WHITE.withAlpha(0.5),
    oddColor: CesiumColor.BLUE.withAlpha(0.5),
    repeat: new Cartesian2(2.0, 2.0),
  });

  viewer.entities.add({
    position: Cartesian3.fromDegrees(-21.499795, 64.841967),
    ellipse: {
      semiMinorAxis: 50.0,
      semiMajorAxis: 50.0,
      rotation: CesiumMath.toRadians(30.0),
      material: checkedMaterial,
    },
  });


}

export default function DMap() {

  return (
    <>
      <button onClick={doIt}>Doti</button >
      <div id="cesiumContainer" style={{ position: "absolute", width: "60vw", height: "60vh", zIndex: "10", top: "15vh", left: "15vw" }}>3D-Map</div>
      <div className="polaroid polaroid-big" style={{width: "150px", position: "absolute", top: "15vh", left: "75vw", zIndex:"20"}}>
        <img src='https://images.ctfassets.net/q0wjbbqqoctx/1IBOUyJDtxg5gaxTEXpZ0s/5bc5d54849e915f7d029922b538e0fe2/_DSC9455.JPG?fm=webp&w=150' />
        <p>Haukadalsvatn</p>
      </div>
    </>
  )
}
