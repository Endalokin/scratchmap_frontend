// The URL on your server where CesiumJS's static files are hosted.


import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, ImageryLayer, IonWorldImageryStyle, Cartesian2, Color as CesiumColor, Camera as CesiumCamera, StripeMaterialProperty, CheckerboardMaterialProperty, Rectangle } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

window.CESIUM_BASE_URL = "../assets/cesium"

const { VITE_CESIUM_TOKEN } = import.meta.env;

Ion.defaultAccessToken = VITE_CESIUM_TOKEN;

async function create3d(lon, lat, altitude = 400) {

  const home_view = new Rectangle.fromDegrees(lon - 1, lat - 1, lon + 1, lat + 1)
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

  viewer?.camera.flyTo({
    destination: Cartesian3.fromDegrees(lon, lat, altitude)
  });

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

  const [displayStartButton, setDisplayStartButton] = useState("display-flex")
  const [displayMap, setDisplayMap] = useState(true)

  function toggleVisibility() {
    setDisplayStartButton(prev => prev == "display-none" ? "display-flex" : "display-none")
    create3d(mainImage.location.lon, mainImage.location.lat)
  }

  function toggleMapImage(e) {
    setDisplayMap(prev => !prev)
  }

  let mainElementWidth = Math.floor(window.innerWidth * 0.8 - 250)
  let mainElementHeight = Math.floor(window.innerHeight * 0.6)

  return (
    <>
      <div id="single-details">
        <h2>3D-Map</h2>
        <button className='ribbon' onClick={() => navigate(-1)}>Back</button >
        <div>
          <button className={`${displayStartButton} notching`} onClick={toggleVisibility}>START</button>
          <div id="cesiumContainer" className={displayMap ? "display-flex" : "display-none"} style={{ width: mainElementWidth, height: mainElementHeight }}>

          </div>
          <div className={displayMap ? "display-none" : "display-flex"} style={{ width: mainElementWidth, height: mainElementHeight, justifyContent: "center" }}>
            <img src={`${mainImage?.imgUrl}?fm=webp&w=${mainElementWidth}&h=${mainElementHeight}`} alt=""  />
          </div>

        </div>
        <div className="polaroid polaroid-big" style={{ width: "150px" }}>

          <img src={`${mainImage?.imgUrl}?fm=webp&w=150`} className="magnifier" onMouseEnter={toggleMapImage} onMouseLeave={toggleMapImage} />
          <p>{mainImage?.name}</p>
        </div>
      </div>
    </>
  )
}
