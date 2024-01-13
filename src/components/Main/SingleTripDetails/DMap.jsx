// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = "./cesium"

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, ImageryLayer, IonWorldImageryStyle, Cartesian2, Color as CesiumColor, Camera as CesiumCamera, StripeMaterialProperty, CheckerboardMaterialProperty, Rectangle } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

// Your access token can be found at: https://ion.cesium.com/tokens.
// This is the default access token from your ion account

const { VITE_CESIUM_TOKEN } = import.meta.env;

Ion.defaultAccessToken = VITE_CESIUM_TOKEN;



async function create3d(lon, lat, altitude = 400) {
  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.

  const home_view = new Rectangle.fromDegrees(lon - 1, lat - 1, lon + 1, lat + 1)
  console.log(home_view)
  CesiumCamera.DEFAULT_VIEW_RECTANGLE = home_view
  CesiumCamera.DEFAULT_VIEW_FACTOR = 0

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
    destination: Cartesian3.fromDegrees(lon, lat, altitude)
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
    position: Cartesian3.fromDegrees(lon, lat),
    ellipse: {
      semiMinorAxis: 50.0,
      semiMajorAxis: 50.0,
      rotation: CesiumMath.toRadians(30.0),
      material: checkedMaterial,
    },
  });
}

export default function DMap() {

  let navigate = useNavigate()

  const [experiences] = useOutletContext();
  let { imgid } = useParams()
  let mainImage
  if (imgid) {
    mainImage = experiences?.find(e => e.id == imgid)
  }

  const [displayState, setDisplayState] = useState("display-flex")

  function toggleVisibility() {
    setDisplayState(prev => prev == "display-none" ? "display-flex" : "display-none")
    create3d(mainImage.location.lon, mainImage.location.lat)
  }

  return (
    <>
      <div id="single-details">
        <h2>3D-Map</h2>
        <button className='ribbon' onClick={() => navigate(-1)}>Back</button >
        <div id="cesiumContainer" style={{ width: "calc(80vw - 250px)", height: "60vh" }}>

          <button className={`${displayState} notching`} onClick={toggleVisibility}>START</button>
        </div>
        <div className="polaroid polaroid-big" style={{ width: "150px" }}>

          <img src={`${mainImage?.imgUrl}?fm=webp&w=150`} />
          <p>{mainImage?.name}</p>
        </div>
      </div>
    </>
  )
}
