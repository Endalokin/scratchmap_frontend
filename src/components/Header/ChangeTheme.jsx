import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ChangeTheme() {

    function toggleTheme (e) {
        e.preventDefault();
        let bodyElement = document.querySelector('body')
        bodyElement.classList.toggle('dark')

    }

  return (
    <NavLink onClick={toggleTheme}>{'\u{1F313}'}</NavLink>
  )
}
