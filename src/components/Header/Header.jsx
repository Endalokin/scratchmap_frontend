import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h2>ScratchMap</h2>
      <menu>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink>Travels</NavLink>
        <NavLink to="/footprint">Footprint</NavLink>
      </menu>
    </header>
  )
}
