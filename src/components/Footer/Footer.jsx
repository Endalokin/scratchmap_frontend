import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'

export default function Footer({setLoginIsOpen, userName, setUserName}) {

  return (
    <footer>
      <div>{!userName ? <Link to="/login">Login</Link> : <div><span>Logged in as: ${userName}</span> <span onClick={() => setUserName()}>{'\u23FC'}</span></div>}</div>
      <div>Documentation</div>
    </footer>
  )
}
