import React from 'react'

export default function CompensationTree({ compensatedTrip }) {

    const livingTrees = [
        "./assets/watercolor-tree-2.png",
        "./assets/watercolor-tree-10.png",
        "./assets/watercolor-tree-11.png"
    ]

    const deadTrees = [
        "./assets/dead-tree-silhouette-2-5.png",
        "./assets/dead-tree-silhouette-2-9.png",
        "./assets/dead-tree-silhouette-2-10.png"
    ]

    let livingRandom = Math.floor(Math.random() * 3)
    let deadRandom = Math.floor(Math.random() * 3)

    return (
        <>
            {compensatedTrip ? <img src={livingTrees[livingRandom]} alt="living tree" /> : <img src={deadTrees[deadRandom]} alt="dead tree" />}
        </>
    )
}
