import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import OAuth from './Components/auth/OAuth'
import { useSelector, useDispatch } from "react-redux";
import UserSidebarNavigation from './Components/SidebarNavigation/UserSidebarNavigation'
import DeptSidebarNavigation from './Components/SidebarNavigation/DeptSidebarNavigation'
function Layout() {

  const userData = useSelector((store) => store.userData);
  const deptData = useSelector((store) => store.departmentData);
  const userRole = userData?.role;
  const deptRole = deptData?.role;
  return (
    <>
      <Header />

      {userRole !== "" || deptRole !== "" ?
        userRole !== "" ?
          <div className={'flex gap-7'}>
            <UserSidebarNavigation />
            <Outlet />
          </div>
          :
          <div className={'flex gap-7'}>
            <DeptSidebarNavigation />
            <Outlet />
          </div>
        : ''
      }




      <Footer />
    </>
  )
}

export default Layout
