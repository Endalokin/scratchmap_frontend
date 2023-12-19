import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <div>ScratchMap</div>
      <menu>
        <NavLink>About</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink>Travels</NavLink>
        <NavLink>Footprint</NavLink>
      </menu>
    </header>
  )
}
