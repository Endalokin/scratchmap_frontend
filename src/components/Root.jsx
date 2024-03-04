import React from 'react'
import Header from './Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer/Footer'
import { useState, useEffect } from 'react'
import fetchData from '../utils/fetchAPI'
import LoadingBar from './LoadingBar'
import { Toaster, toast } from 'react-hot-toast'

export default function Root() {

  const [user, setUser] = useState({ username: sessionStorage.getItem('username'), userid: sessionStorage.getItem('userid') })
  const { VITE_SERVER_URL } = import.meta.env;
  const [experiences, setExperiences] = useState()
  const [trips, setTrips] = useState()

  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    const TEST_URL = `${VITE_SERVER_URL}/test`
    let EXPERIENCES_URL
    let TRIPS_URL

    if (user?.username) {
      EXPERIENCES_URL = `${VITE_SERVER_URL}/experiences?user=${user.username}`
      TRIPS_URL = `${VITE_SERVER_URL}/trips?user=${user.username}`
    } else {
      EXPERIENCES_URL = `${VITE_SERVER_URL}/experiences`
      TRIPS_URL = `${VITE_SERVER_URL}/trips`
    }

    setLoadingData(true)

    let controller = new AbortController();
    let serverAvailable = false
    const availabilityPromise = fetchData(TEST_URL, (data) => {
      serverAvailable = true
    }, "GET", null, controller)

    toast.promise(availabilityPromise, {
      loading: "Wakes up server",
      success: "Server connection running",
      error: "Server not available"
    }, {
      success: {
        icon: "⇆"
      }
    })

    fetchData(EXPERIENCES_URL, (data) => {
      setExperiences(data)
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

  }, [user])

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
        <Toaster reverseOrder={true} />
        <Outlet context={[experiences, setExperiences, trips, setTrips, user, setUser]} />
      </main>
      <Footer user={user} setUser={setUser} />
    </>
  )
}
