import React from 'react'

export default function LoadingBar({ loadingData }) {
    return (
        <>
            {/* {loadingData && <div style={{ display: "flex" }}><p>loading </p><p className="rotating">{'\u27F3'}</p></div>} */}
            {loadingData && <div style={{ overflow: "hidden" }}>
                <div className="loader" ></div>
            </div>}
        </>
    )
}
