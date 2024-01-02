import React from 'react'
import { NavLink } from 'react-router-dom'
import RefreshPage from './RefreshPage'
import ChangeTheme from './ChangeTheme'

export default function Header({experiences, trips}) {
  
  return (
    <header>
      <h2>ScratchMap</h2>
      <menu>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink>Travels</NavLink>
        <NavLink to="/footprint">Footprint</NavLink>
        <RefreshPage experiences={experiences} trips={trips} />
        <ChangeTheme />
      </menu>
    </header>
  )
}
