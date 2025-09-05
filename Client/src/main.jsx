import { StrictMode } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import UserSignUpWrapper from './Components/UserSignUp/UserSignUpWrapper.jsx'
import { Provider } from 'react-redux'
import {Store} from './Store/Store.js'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout/>}>
      <Route path='/user-signup' element={<UserSignUpWrapper></UserSignUpWrapper>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <ToastContainer/>
    <RouterProvider router={router} />
    </Provider>
 
)
