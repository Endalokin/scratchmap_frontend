import React from 'react'
import PolaroidImage from './PolaroidImage'

export default function TitleSection() {
    return (
        <div className="grid-3">
            <PolaroidImage url={"./assets/header_specht.jpg"} />
            <PolaroidImage url={"./assets/header_sanary.jpg"} />
            <PolaroidImage url={"./assets/header_seerose.png"} />
            <PolaroidImage url={"./assets/header_vestmannaeyjar.jpg"} />
            <div><h1>Scratch Map</h1></div>
            <PolaroidImage url={"./assets/header_moewe.jpg"} />
            <PolaroidImage url={"./assets/header_muscheln.jpg"} />
            <PolaroidImage url={"./assets/header_seerose.png"} />
            <PolaroidImage url={"./assets/header_specht.jpg"} />
        </div>
    )
}
