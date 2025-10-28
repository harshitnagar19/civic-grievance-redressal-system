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
import AboutUs from './Components/screens/AboutUs.jsx';
import { Parallax, ParallaxProvider, useParallax } from 'react-scroll-parallax';
import Hero from './Components/Hero/Hero.jsx';
import OAuth from './Components/auth/OAuth.jsx';
import DepartmentSignUpWrapper from './Components/DepartmentSignUp/DepartmentSignUpWrapper.jsx';
import DepartmentSignInWrapper from './Components/DepartmentSign/DepartmentSignInWrapper.jsx';
import DepartmentDashboard from './Components/Dashboard/DepartmentDashboard.jsx';
import AllStates from './Components/AllStates/AllStates.jsx';
import AllDistricts from './Components/AllDistricts/AllDistricts.jsx';
import AllDepartment from './Components/AllDepartment/AllDepartment.jsx';
import DepartmentInfo from './Components/DepartmentInfo/DepartmentInfo.jsx';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ComplaintWrapper from './Components/complaint/ComplaintWrapper.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* user */}
      <Route path={routes.userSignup} element={<UserSignUpWrapper />}></Route>
      <Route path={routes.userLogin} element={<UserLoginWrapper />}></Route>

      {/* department */}
      <Route path={routes.deptSignUp} element={<DepartmentSignUpWrapper />}></Route>
      <Route path={routes.deptLogin} element={<DepartmentSignInWrapper />}></Route>

      
      <Route path="/" element={<Hero />}></Route>
      <Route path={routes.aboutUs} element={<><Header /><AboutUs /><Footer /></>}></Route>
      <Route path={routes.departmentInfo} element={<><Header /><AllStates /><Footer/></>}></Route>
      <Route path={`${routes.departmentInfo}/:param`} element={<><Header /><AllDistricts /><Footer/></>}></Route>
      <Route path={`${routes.departmentInfo}/:param/:district`} element={<><Header /><AllDepartment /><Footer/></>}></Route>
      <Route path={`${routes.departmentInfo}/:param/:district/:departmentName`} element={<><Header /><DepartmentInfo /><Footer/></>}></Route>

      
      <Route path='' element={<OAuth><Layout /></OAuth>}>
        <Route path={routes.userDashboard} element={<OAuth><UserDashboard /></OAuth>}></Route>
        <Route path={routes.deptDashboard} element={<OAuth><DepartmentDashboard /></OAuth>}></Route>
        <Route path={routes.raiseComplaint} element={<OAuth><ComplaintWrapper /></OAuth>}></Route>
      </Route>
      <Route path='*' element={<NotFound />}></Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>

)
