import React from 'react'
import Header from './Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
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

  const TEST_URL = `${VITE_SERVER_URL}/experiences`
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {    
    setLoadingData(true)
    let controller = new AbortController();
    let serverAvailable = false
    fetchData(TEST_URL, (data) => {
      serverAvailable = true
    },"GET",null,controller)

    fetchData(EXPERIENCES_URL, (data) => {
      setExperiences(data)
      console.log(data)
    },"GET",null,controller)
    fetchData(TRIPS_URL, (data) => {
      setTrips(data)
      console.log(data)
    },"GET",null,controller)

    setTimeout(() => {
      if (!serverAvailable) {
        console.log("Server is not available")
        controller.abort()
        location.reload();
      }
    }, 10000)

  }, [])

  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
