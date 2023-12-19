import './App.css'
import Root from './components/Root'
import Map from './components/Main/Map/Map'
import Test from './utils/Test'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/map" element={<Map />} />
      <Route path="/test" element={<Test />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
