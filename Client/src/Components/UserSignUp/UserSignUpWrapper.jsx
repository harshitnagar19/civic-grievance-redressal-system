import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {UserSignUpValidation} from "../../validations/UserSignUpValidation"
import UserSignUpForm from "./UserSignUpForm";


const UserSignUpWrapper = () => {

  const afterRegister = (res) => {    
  };
  
  const initialValues = {
    name:"",
    email: "",
    mobile:"",
    password: "",
    confirmPassword:"",
  };

  const handleSubmit = async (values, {setSubmitting,resetForm}) => {
      setSubmitting(true);
      resetForm();    
      setSubmitting(false);
      console.log(values)
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
