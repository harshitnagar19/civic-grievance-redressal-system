import {Outlet} from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import OAuth from './Components/auth/OAuth'
function Layout() {
  return (
   <>
   <OAuth> <Header/></OAuth>
    <Outlet/>
    <Footer/>
   </>
  )
}

export default Layout
