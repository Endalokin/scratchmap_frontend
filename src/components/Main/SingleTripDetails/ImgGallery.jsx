import React from 'react'
import ImgGalleryItem from './ImgGalleryItem'

export default function ImgGallery({singleTripExperiences}) {
  return (
    <div>
        {singleTripExperiences?.map(se => <ImgGalleryItem singleTripExperience={se} />)}
    </div>
  )
}
