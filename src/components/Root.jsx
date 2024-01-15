import React from 'react'
import Header from './Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer/Footer'
import { useState, useEffect } from 'react'
import fetchData from '../utils/fetchAPI'
import LoadingBar from './LoadingBar'

export default function Root() {

  const [userName, setUserName] = useState()

  const { VITE_SERVER_URL } = import.meta.env;
  const [experiences, setExperiences] = useState()
  const [trips, setTrips] = useState()

  const [loadingData, setLoadingData] = useState(false)
  const [loginIsOpen, setLoginIsOpen] = useState(false)

  useEffect(() => {
    const TEST_URL = `${VITE_SERVER_URL}/test`
    let EXPERIENCES_URL
    let TRIPS_URL
    
    if (userName) {
      EXPERIENCES_URL = `${VITE_SERVER_URL}/experiences?user=${userName}`
      TRIPS_URL = `${VITE_SERVER_URL}/trips?user=${userName}`
    } else {
      EXPERIENCES_URL = `${VITE_SERVER_URL}/experiences`
      TRIPS_URL = `${VITE_SERVER_URL}/trips`
    }

    setLoadingData(true)
    let controller = new AbortController();
    let serverAvailable = false
    fetchData(TEST_URL, (data) => {
      serverAvailable = true
    }, "GET", null, controller)

    fetchData(EXPERIENCES_URL, (data) => {
      setExperiences(data)
      console.log(data)
    }, "GET", null, controller)
    fetchData(TRIPS_URL, (data) => {
      setTrips(data)
      console.log(data)
    }, "GET", null, controller)

    setTimeout(() => {
      if (!serverAvailable) {
        console.log("Server is not available")
        controller.abort()
        location.reload();
      }
    }, 15000)

  }, [userName])

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
        <Outlet context={[experiences, setExperiences, trips, setTrips, userName, setUserName]} />

      </main>
      <Footer setLoginIsOpen={setLoginIsOpen} loginIsOpen={loginIsOpen} userName={userName} setUserName={setUserName} />
    </>
  )
}
