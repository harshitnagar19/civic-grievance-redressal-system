import React, { useState } from "react";
import { Form, Formik } from "formik"
import { ComplaintForm } from "./ComplaintForm"
import { ComplaintValidations } from "../../validations/ComplaintValidations";
export const ComplaintWrapper = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(false)
            console.log(values)

        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    

    const initialValues = {
        state: "",
        district: "",
        location: {
            type: "",
            wardNumber: null,
            areaName: "",
            district: "",
            state: ""
        },
        department: "",
        userEmail: "",
        title: "",
        description: "",
        image: {
            public_id: "",
            url: ""
        },
        priority: "",
        status: ""
    }
    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={true}
            onSubmit={handleSubmit}
            validationSchema={ComplaintValidations}
        >
            {(formikProps) => {
                return (
                    <Form>
                        <ComplaintForm formikProps={formikProps} />
                    </Form>
                )
            }}
        </Formik>
    )

}
export default ComplaintWrapper;