import React from 'react'
import { Link } from 'react-router-dom'

export default function ImgGalleryItem({ singleTripExperience, widthSize }) {

    return (
        <div className='polaroid'>
            <Link to={`${window.location.origin}/trip/${singleTripExperience?.trip?.sys.id}/${singleTripExperience?.id}`}><img key={singleTripExperience?.id} src={`${singleTripExperience?.imgUrl}?fm=webp&w=${widthSize}`} /></Link>
        </div>
    )
}
