import React, { useState , useEffect } from 'react'
import { useParams ,useNavigate} from "react-router-dom";
import axios from 'axios';
import { routes } from '../../data/routes';
import { notifyError } from '../../utils/tostify';
import LocationCard from '../../utils/LocationCard';

const AllDistricts = () => {
    const {param} =  useParams()
    const [districts, setDistricts] = useState([])
    const navigate = useNavigate()

    const getAllDistricts = async () => {
        await axios.get(`${import.meta.env.VITE_BASEURL}/department/get-all-districts-of-state?state=${param}`).then((res) => {
            if (res.data.status == "OK") {
                if(res.data.data.length==0){
                    navigate(routes.departmentInfo)
                }
                setDistricts(res.data.data)
            } else {
                notifyError(res.data.msg)
            }
        }).catch((err) => {
            const msg = `err on AllState on calling axios ${err.message}`
            notifyError(msg);
        })
    }

    useEffect(()=>{
        getAllDistricts()
    },[])

  if(districts.length==0) return <>Loading...</> 
  return (
    <div className='p-16 flex gap-15 flex-wrap shrink-1 '>{
        districts?.map((ele, ind) => {
            return (
                <div className='pb-14  ' key={ind}>
                <LocationCard
                
                // className='cursor-pointer border rounded-xl px-3 py-2 bg-amber-300'
                onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Card clicked!");
                    navigate(`${ele}`)
                }}
                locName={ele}
                locType={"Districts"}
            /> 
            </div>
             
            )
        })
    }</div>
  )
}

export default AllDistricts