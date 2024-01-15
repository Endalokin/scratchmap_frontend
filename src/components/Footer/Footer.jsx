import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'

export default function Footer({setLoginIsOpen, user, setUser}) {

  return (
    <footer>
      <div>{!user?.username ? <Link to="/login">Login</Link> : <div><span>Logged in as: {user.username}</span> <span onClick={() => setUser()}>{'\u23FC'}</span></div>}</div>
      <div>Documentation</div>
    </footer>
  )
}
