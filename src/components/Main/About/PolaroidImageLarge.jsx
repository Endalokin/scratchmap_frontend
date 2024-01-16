import React from 'react'
import { Link } from 'react-router-dom'

export default function PolaroidImageLarge({mainImage}) {

    return (
        <div id="animated-img" className="polaroid polaroid-big" style={{ position: "relative" }}>
            <img src={`${mainImage.imgUrl}?fm=webp&w=600`} alt={`${mainImage.name}`} />
            <h2 className="edding">{mainImage.name.substr(0, 23)}</h2>
            <Link to={`${window.location.origin}/3d/${mainImage?.id}`} ><button className='ribbon ribbon-small' style={{ position: "absolute", top: "15px", right: "15px" }}>3D</button></Link>
        </div>
    )
}
