import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import { useState, useEffect } from 'react'
import fetchData from '../utils/fetchAPI'
import LoadingBar from './LoadingBar'

export default function Root() {

  const { VITE_SERVER_URL } = import.meta.env;
  const [experiences, setExperiences] = useState()
  const EXPERIENCES_URL = `${VITE_SERVER_URL}/experiences`

  const [trips, setTrips] = useState()
  const TRIPS_URL = `${VITE_SERVER_URL}/trips`

  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    setLoadingData(true)
    fetchData(EXPERIENCES_URL, (data) => {
      setExperiences(data)
      console.log(data)
    })
    fetchData(TRIPS_URL, (data) => {
      setTrips(data)
      console.log(data)
    })
  }, [])

  if (experiences && trips && loadingData) {
      setLoadingData(false)
  }

  return (
    <>
      <LoadingBar loadingData={loadingData} />
      <Header experiences={experiences} trips={trips} />
      <main>
        <Outlet context={[experiences, setExperiences, trips, setTrips]} />
      </main>
      <Footer />
    </>
  )
}
