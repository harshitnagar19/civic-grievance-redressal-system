import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { routes } from '../../data/routes';

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("adminToken")
    if(!token){
      navigate(routes.adminLogin)
    }
  },[])
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard