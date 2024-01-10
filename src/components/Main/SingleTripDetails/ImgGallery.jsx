import React from 'react'
import ImgGalleryItem from './ImgGalleryItem'

export default function ImgGallery({singleTripExperiences}) {
  return (
    <div className="vertical-scroll-80">
        {singleTripExperiences?.map(se => <ImgGalleryItem key={`sm-gallery-item-${se.id}`} singleTripExperience={se} />)}
    </div>
  )
}
