import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import { useState, useEffect } from 'react'
import fetchData from '../utils/fetchAPI'

export default function Root() {

  const { VITE_SERVER_URL } = import.meta.env;
  const [experiences, setExperiences] = useState()
  const EXPERIENCES_URL = `${VITE_SERVER_URL}/experiences`

  const [mapExperiences, setMapExperiences] = useState()

  const [trips, setTrips] = useState()
  const TRIPS_URL = `${VITE_SERVER_URL}/trips`

  useEffect(() => {
    fetchData(EXPERIENCES_URL, (data) => {
      setExperiences(data)
      console.log(data)
    })
    fetchData(TRIPS_URL, (data) => {
      setTrips(data)
      console.log(data)
    })
  }, [])

  useEffect(() => {
    function uniquePlaces(data, key) {
      return [...new Map(data.map(x => {
        return [`${Math.ceil(x.location.lon)}, ${Math.ceil(x.location.lat)}`, x]
      })).values()
      ]
    }
    if (experiences) {
      setMapExperiences(uniquePlaces(experiences, it => it.location))
    }

  }, [experiences])

  return (
    <>
      <Header experiences={experiences} trips={trips} />
      <main>
        <Outlet context={[experiences, setExperiences, trips, setTrips, mapExperiences]} />
      </main>
      <Footer />
    </>
  )
}
