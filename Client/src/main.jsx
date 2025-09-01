import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import App from './App.jsx'
=======
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout/>}>
      {/* <Route path='/' */}
    </Route>
  )
)
>>>>>>> upstream/main

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
