[33mcommit c3071cecff5fc7318a109793f35262f5b2e05ea4[m[33m ([m[1;36mHEAD -> [m[1;32meditTrip[m[33m)[m
Author: Nora Westphal <tupfen@hotmail.de>
Date:   Wed Mar 27 10:45:28 2024 +0100

    edit-flag is shown on singleTripDetails if logged in

[1mdiff --git a/src/components/Main/Map/DisplayImages.jsx b/src/components/Main/Map/DisplayImages.jsx[m
[1mindex f169105..cc4f2c5 100644[m
[1m--- a/src/components/Main/Map/DisplayImages.jsx[m
[1m+++ b/src/components/Main/Map/DisplayImages.jsx[m
[36m@@ -11,7 +11,6 @@[m [mexport default function DisplayImages({ experiences, displaySeasons, displayDayt[m
     const navigate = useNavigate()[m
 [m
     let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)[m
[31m-    console.log(currentArray)[m
 [m
     return ([m
         <>[m
[1mdiff --git a/src/components/Main/SingleTripDetails/SingleTripDetails.jsx b/src/components/Main/SingleTripDetails/SingleTripDetails.jsx[m
[1mindex 74888cd..c361cbc 100644[m
[1m--- a/src/components/Main/SingleTripDetails/SingleTripDetails.jsx[m
[1m+++ b/src/components/Main/SingleTripDetails/SingleTripDetails.jsx[m
[36m@@ -1,16 +1,17 @@[m
[31m-import React, { useRef } from 'react'[m
[31m-import { useParams, useOutletContext, Link } from 'react-router-dom'[m
[32m+[m[32mimport React, { useRef, useState } from 'react'[m
[32m+[m[32mimport { useParams, useOutletContext } from 'react-router-dom'[m
 import ImgGallery from './ImgGallery';[m
 import { MapContainer, Polyline, TileLayer, Marker, Tooltip } from 'react-leaflet'[m
 import DisplayImages from '../Map/DisplayImages';[m
 import TripInfo from './TripInfo';[m
 import PolaroidImageLarge from '../About/PolaroidImageLarge';[m
[32m+[m[32mimport MapFilters from '../Map/MapFilters';[m
 [m
 export default function SingleTripDetails() {[m
 [m
     const ref = useRef(null)[m
 [m
[31m-    const [experiences, , trips] = useOutletContext();[m
[32m+[m[32m    const [experiences, , trips, , user] = useOutletContext();[m
 [m
     let { id, imgid } = useParams()[m
     const singleTripDetails = trips?.find(t => t.id == id)[m
[36m@@ -59,9 +60,20 @@[m [mexport default function SingleTripDetails() {[m
         ref?.current?.scrollIntoView({ behavior: 'smooth' });[m
     }[m
 [m
[32m+[m[32m    const [displayState, setDisplayState] = useState("display-none")[m
[32m+[m
[32m+[m[32m    function toggleFilterVisibility() {[m
[32m+[m[32m        setDisplayState(prev => prev == "display-none" ? "display-flex" : "display-none")[m
[32m+[m[32m    }[m
[32m+[m
     return ([m
         <>[m
[32m+[m[32m            {user && <div>[m
[32m+[m[32m                <button className="ribbon ribbon-small" onClick={toggleFilterVisibility}>Edit</button>[m
[32m+[m[32m                <div id="mapFilterSection" className={`${displayState} modal showUp`}><MapFilters toggleFilterVisibility={toggleFilterVisibility} /></div>[m
[32m+[m[32m            </div>}[m
             <div id="single-details" className='single-details centered-element showUp'>[m
[32m+[m
                 <div >[m
                     <TripInfo trip={singleTripDetails} />[m
                     {singleTripExperiencesMapable?.length > 0 && <button className="notching" onClick={scrollToMap}>⮟ Map ⮟</button>}[m
