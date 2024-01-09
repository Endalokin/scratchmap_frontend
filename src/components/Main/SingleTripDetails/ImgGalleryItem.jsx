import React from 'react'

export default function ImgGalleryItem({ singleTripExperience }) {
    return (
        <div className='polaroid'>
            <img key={singleTripExperience?.id} src={`${singleTripExperience?.imgUrl}?fm=webp&w=150`} />
        </div>
    )
}
