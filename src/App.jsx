import './App.css'
import Root from './components/Root'
import About from './components/Main/About/About'
import Map from './components/Main/Map/Map'
import Footprint from './components/Main/Footprint/Footprint'
import Test from './utils/Test'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SingleTripDetails from './components/Main/SingleTripDetails/SingleTripDetails'
import DMap from './components/Main/SingleTripDetails/DMap'
import Login from './components/Login'
import Trips from './components/Trips/Trips'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<Map />} />
      <Route path="/footprint/:display?" element={<Footprint />} />
      <Route path="/test" element={<Test />} />
      <Route path="/trip/:id/:imgid?" element={<SingleTripDetails />} />
      <Route path="/trip/:id/:imgid/3d" element={<DMap />} />
      <Route path="/3d/:imgid" element={<DMap />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/*" element={<About />} />
    </Route>
  )
)

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
