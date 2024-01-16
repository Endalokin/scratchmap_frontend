import React from 'react'
import { Link } from 'react-router-dom'

export default function ImgGalleryItem({ singleTripExperience, widthSize }) {

    console.log(Math.floor(window.innerWidth))
    console.log(Math.floor(window.innerHeight * 0.6))


    return (
        <div className='polaroid'>
            <Link to={`${window.location.origin}/trip/${singleTripExperience?.trip.sys.id}/${singleTripExperience?.id}`}><img key={singleTripExperience?.id} src={`${singleTripExperience?.imgUrl}?fm=webp&w=${widthSize}`} /></Link>
        </div>
    )
}
