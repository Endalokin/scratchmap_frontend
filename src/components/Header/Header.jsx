import React from 'react'
import { NavLink } from 'react-router-dom'
import RefreshPage from './RefreshPage'
import ChangeTheme from './ChangeTheme'

export default function Header({experiences, trips}) {
  
  return (
    <header>
      <NavLink to="/about"><h2>ScratchMap</h2></NavLink>
      <menu>
        <NavLink to="/map">Map</NavLink>
        <NavLink>Travels</NavLink>
        <NavLink to="/footprint">Footprint</NavLink>
        <RefreshPage experiences={experiences} trips={trips} />
        <ChangeTheme />
      </menu>
    </header>
  )
}
