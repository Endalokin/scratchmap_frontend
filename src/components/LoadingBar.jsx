import React from 'react'
import {toast} from 'react-hot-toast'

export default function LoadingBar({ loadingData }) {
    return (
        <>
            {loadingData && <div style={{ overflow: "hidden" }}>
                <div className="loader" ></div>
            </div>}
        </>
    )
}
