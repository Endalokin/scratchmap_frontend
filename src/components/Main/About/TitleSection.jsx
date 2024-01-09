import React from 'react'
import PolaroidImage from './PolaroidImage'

export default function TitleSection() {
    return (
        <div className="grid-3">
            <PolaroidImage url={"./assets/header_specht.jpg"} />
            <PolaroidImage url={"./assets/header_seerose.png"} />
            <PolaroidImage url={"./assets/header_seerose.png"} />
            <PolaroidImage url={"./assets/header_specht.jpg"} />
            <div><h1>Scratch Map</h1></div>
            <PolaroidImage url={"./assets/header_seerose.png"} />
            <PolaroidImage url={"./assets/header_specht.jpg"} />
            <PolaroidImage url={"./assets/header_seerose.png"} />
            <PolaroidImage url={"./assets/header_specht.jpg"} />
        </div>
    )
}
