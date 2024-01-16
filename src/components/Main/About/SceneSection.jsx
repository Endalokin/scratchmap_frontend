import React from 'react'
import { Link } from 'react-router-dom'

export default function SceneSection() {
  return (
    <>
      <h2>Discover the surrounding in 3D</h2>
      <Link to="/3d/7jpIn9ke5Am4BzRIhM47DA"><img src="../assets/3dscene.png" alt="3D scene at the position of a experience" style={{maxWidth: "100%"}} /></Link>
      <Link to="/3d/7jpIn9ke5Am4BzRIhM47DA"><button className="notching">Display 3D scene</button></Link>
    </>
  )
}
