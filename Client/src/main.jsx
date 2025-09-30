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
      {/* Public routes without Layout */}
      <Route path={routes.userSignup} element={<UserSignUpWrapper />} />
      <Route path={routes.userLogin} element={<UserLoginWrapper />} />
      <Route path={routes.deptSignUp} element={<DepartmentSignUpWrapper />} />
      <Route path={routes.deptLogin} element={<DepartmentSignInWrapper />} />
      <Route index element={<Hero />} />
      {/* Routes with Layout */}
      <Route path="/" element={<Layout />}>
        
        <Route path={routes.aboutUs} element={<AboutUs />} />
        <Route path={routes.raiseComplaint} element={<ComplaintWrapper />} />

        {/* User/Department Dashboards (protected by OAuth) */}
        <Route path={routes.userDashboard} element={<OAuth><UserDashboard /></OAuth>} />
        <Route path={routes.deptDashboard} element={<OAuth><DepartmentDashboard /></OAuth>} />

        {/* Department Info Routes */}
        <Route path={routes.departmentInfo} element={<AllStates />} />
        <Route path={`${routes.departmentInfo}/:param`} element={<AllDistricts />} />
        <Route path={`${routes.departmentInfo}/:param/:district`} element={<AllDepartment />} />
        <Route path={`${routes.departmentInfo}/:param/:district/:departmentName`} element={<DepartmentInfo />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>

)
