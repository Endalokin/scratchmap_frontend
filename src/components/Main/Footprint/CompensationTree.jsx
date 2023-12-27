import React from 'react'

export default function CompensationTree({ compensatedTrip }) {
    return (
        <>
            {compensatedTrip ? <img src="./src/assets/democontent_tree_living.png" alt="living tree" /> : <img src="./src/assets/democontent_tree_dead.png" alt="dead tree" />}
        </>
    )
}
