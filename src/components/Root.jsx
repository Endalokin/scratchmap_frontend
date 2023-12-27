import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import { useState, useEffect } from 'react'
import fetchData from '../utils/fetchAPI'

export default function Root() {

  const [experiences, setExperiences] = useState()
  const URL = "http://localhost:8080/contentful/experiences"

  useEffect(() => {
      fetchData(URL, (data) => {
          setExperiences(data)
          console.log(data)
      })
  }, [])

  return (
    <>
      <Header experiences={experiences} setExperiences={setExperiences} />
      <main>
        <Outlet context={[experiences, setExperiences]} />
      </main>
      <Footer />
    </>
  )
}
