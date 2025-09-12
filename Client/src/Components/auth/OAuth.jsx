import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserData } from '../../Store/userDataSlice'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../data/routes'
import { toast } from 'react-toastify';
import axios from 'axios'
function OAuth({ children }) {
    const notifyError = (err) => toast.error(err);
    const notifySuccess = (suc) => toast.success(suc);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const authenticator = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(routes.userLogin)
        } else {
            try {
                await axios.post(`${import.meta.env.VITE_BASEURL}/user/refresh`, {},{ headers: { token: token } })
                    .then((response) => {
                        if (response.data.status === "OK") {
                            dispatch(addUserData(response.data.data[0]));
                            notifySuccess(response.data.msg);
                        }
                        if (response.data.data.status === "ERR") {
                            localStorage.removeItem("token");
                            navigate(routes.userLogin);
                        }
                    }).catch((error) => {
                        notifyError(error.response.data.msg);
                        localStorage.removeItem("token");
                        navigate(routes.userLogin)
                        console.log(error);
                    })

                setIsLoading(false)

            } catch (error) {
                notifyError(error.message);
                console.log(error);
            }

        }
    }
    useEffect(() => {
        authenticator();
    }, [])
    return (
        <>
            {
                isLoading ? "loading:..." :  children }
            
        </>

    )
}

export default OAuth