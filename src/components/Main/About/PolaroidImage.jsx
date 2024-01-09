import React from 'react'

export default function PolaroidImage({ url }) {
    const randomPolaroidClass = Math.floor(Math.random() * 3) + 1
    return (
        <div className={`polaroid polaroid-${randomPolaroidClass}`}>
            <img src={url} alt="" />
        </div>
    )
}
