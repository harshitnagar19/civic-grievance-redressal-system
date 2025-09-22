import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { notifyError } from '../../utils/tostify'
import { useNavigate } from 'react-router-dom'

const AllStates = () => {

    const getAllStates = async () => {
        await axios.get(`${import.meta.env.VITE_BASEURL}/department/get-all-state-of-department`).then((res) => {
            if (res.data.status == "OK") {
                setStates(res.data.data)
            } else {
                notifyError(res.data.msg)
            }
        }).catch((err) => {
            const msg = `err on AllState on calling axios ${err.message}`
            notifyError(msg);
        })
    }

    const [states, setStates] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getAllStates();
    }, [])
    return (
        <div className='p-16'>{
            states?.map((ele, ind) => {
                return (
                <button
                    key={ind}
                    className='border rounded-xl px-3 py-2 bg-amber-300'
                    onClick={()=>{
                        navigate(`${ele}`)
                    }}
                > 
                    {ele}
                </button>)
            })
        }</div>
    )
}

export default AllStates
