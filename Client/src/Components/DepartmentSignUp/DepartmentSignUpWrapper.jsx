import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from 'react-redux'
import { DepartmentSignUpValidation } from "../../validations/DepartmentValidation"
import DepartmentSignUpForm from "./DepartmentSignUpForm";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { routes } from '../../data/routes'
function DepartmentSignUpWrapper() {
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
        district:''
    }
    const handleSubmit = () => {

    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={DepartmentSignUpValidation}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <DepartmentSignUpForm
                            formikProps={formikProps}
                        />
                    </Form>
                )

                }

            </Formik>
        </>
    )
}

export default DepartmentSignUpWrapper