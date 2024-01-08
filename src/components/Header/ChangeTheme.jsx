import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChartJS } from '../Main/Footprint/FootprintComparisonChart';


export default function ChangeTheme() {

    function toggleTheme (e) {
        e.preventDefault();
        let bodyElement = document.querySelector('body')
        bodyElement.classList.toggle('dark')
        ChartJS.defaults.color = getComputedStyle(document.body).color;
    }

  return (
    <NavLink onClick={toggleTheme}>{'\u{1F313}'}</NavLink>
  )
}
