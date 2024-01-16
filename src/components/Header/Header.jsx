import React from 'react'
import { NavLink } from 'react-router-dom'
import RefreshPage from './RefreshPage'
import ChangeTheme from './ChangeTheme'

export default function Header({ experiences, trips, rotate, setRotate }) {

  return (
    <>
      <header>
        <NavLink to="/about"><h2>ScratchMap</h2></NavLink>
        <input id="menu-toggle" type="checkbox" />
        <label className='menu-button-container' htmlFor="menu-toggle">
          <div className='menu-button'></div>
        </label>
        <menu id="menu">
          <NavLink to="/map" className={window.location.pathname.split("/")[1] == "map" && "activeTab"} >Map</NavLink>
          <NavLink to="/trips" className={window.location.pathname.split("/")[1] == "trips" && "activeTab"}>Trips</NavLink>
          <NavLink to="/footprint" className={window.location.pathname.split("/")[1] == "footprint" && "activeTab"}>Footprint</NavLink>
          <RefreshPage experiences={experiences} trips={trips} rotate={rotate} setRotate={setRotate} />
          <ChangeTheme />
        </menu>
      </header>
    </>
  )
}
