import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from 'react-redux'
import { UserSignUpValidation } from "../../validations/UserValidations"
import UserSignUpForm from "./UserSignUpForm";
import axios from 'axios'
import { addUserData } from '../../Store/userDataSlice';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {routes} from '../../data/routes'
const UserSignUpWrapper = () => {

  const notifyError = (err) => toast.error(err);
  const notifySuccess = (suc) => toast.success(suc);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    userName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
          if (localStorage.getItem("token")) {
              navigate(routes.userDashboard);
          }
      }, [])
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {

      const { confirmPassword, ...payload } = values
      await axios.post(`${import.meta.env.VITE_BASEURL}/user/signup`,
        payload).then((response) => {
          localStorage.setItem("token", response.data.data[0].token)
          dispatch(addUserData(response.data.data[0]))
          notifySuccess(response.data.msg)
          navigate(routes.userDashboard);
        })
    } catch (error) {
      notifyError(error?.response?.data?.msg || "Error")
    }
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSignUpValidation}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >

        {(formikProps) => (
          <Form>
            <UserSignUpForm
              formikProps={formikProps}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserSignUpWrapper;
