import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { DepartmentSignUpValidation } from "../../validations/DepartmentValidation";
import DepartmentSignUpForm from "./DepartmentSignUpForm";
import { useNavigate } from "react-router-dom";
import { routes } from "../../data/routes";

function DepartmentSignUpWrapper() {
  const navigate=useNavigate()
  const initialValues = {
    departmentName: "",
    headOfDepartment: "",
    departmentShortName: "",
    email: "",
    password: "",
    mobileNumber: "",
    city: "",
    state: "",
    deptAddress: "",
    district: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    
    const { district, departmentName, headOfDepartment, departmentShortName, ...restValues } = values;
    
    const apiPayload = {
      DepartmentName:departmentName,
      DepartmentShortName: departmentShortName,
      HeadOfDepartment: headOfDepartment,
      ...restValues 
    };
    console.log(apiPayload)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/department/signup`,
        apiPayload
      );
      toast.success("Department registered successfully!");
      resetForm();
      navigate(routes.deptLogin)
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DepartmentSignUpValidation}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <DepartmentSignUpForm formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
}

export default DepartmentSignUpWrapper;
