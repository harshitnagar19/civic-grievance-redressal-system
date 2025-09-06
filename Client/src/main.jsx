import { ToastContainer, toast } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import UserSignUpWrapper from './Components/UserSignUp/UserSignUpWrapper.jsx'
import { Provider } from 'react-redux'
import { Store } from './Store/Store.js'
import UserLoginWrapper from './Components/Login/UserLoginWrapper.jsx';
import UserDashboard from './Components/Dashboard/UserDashboard.jsx';
import { routes } from './data/routes.js';
import NotFound from './Components/404/NotFound.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={routes.userSignup} element={<UserSignUpWrapper />}></Route>
      <Route path={routes.userLogin} element={<UserLoginWrapper />}></Route>
      <Route path='' element={<Layout />}>
        <Route path={routes.userDashboard} element={<UserDashboard />}></Route>
      </Route>
      <Route path='*' element={<NotFound/>}></Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>

)
