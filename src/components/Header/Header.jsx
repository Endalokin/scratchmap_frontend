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
          <NavLink to="/map">Map</NavLink>
          <NavLink>Travels</NavLink>
          <NavLink to="/footprint">Footprint</NavLink>
          <RefreshPage experiences={experiences} trips={trips} rotate={rotate} setRotate={setRotate} />
          <ChangeTheme />
        </menu>
      </header>
    </>
  )
}
