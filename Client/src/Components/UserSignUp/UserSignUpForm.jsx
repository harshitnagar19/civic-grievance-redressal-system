import React from 'react'
import { Field, ErrorMessage } from "formik";
const UserSignUpForm = ({ formikProps }) => {
    // console.log(formikProps)
    const { values, setFieldValue, isSubmitting, handleBlur ,validateOnChange} = formikProps;
    return (
        <div className='flex justify-center'>
            <div >

                <div><h1>UserSignUpForm</h1></div>

                <Field type="text"
                    name="name"
                    placeholder='UserName'
                    value={values.name}
                    onChange={(e) => { setFieldValue("name", e.target.value) }}
                    className='border'
                    onBlur={handleBlur}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                <br />
                <br />
                <Field
                    type="text"
                    name='email'
                    placeholder='example@gmail.com'
                    value={values.email}
                    onChange={(e) => { setFieldValue("email", e.target.value) }}
                    className='border'
                    onBlur={handleBlur}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                <br />
                <br />
                <Field
                    type="text"
                    name='mobile'
                    placeholder='7024******'
                    value={values.mobile}
                    onChange={(e) => { setFieldValue("mobile", e.target.value) }}
                    className='border'
                    onBlur={handleBlur}
                />
                <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                <br />
                <br />
                <Field type="text"
                    name='password'
                    placeholder='enter password'
                    value={values.password}
                    onChange={(e) => { setFieldValue("password", e.target.value) }}
                    className='border'
                    onBlur={handleBlur}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                <br />
                <br />
                <Field
                    type="text"
                    name="confirmPassword"
                    placeholder='confirm password'
                    value={values.confirmPassword}
                    onChange={(e) => { setFieldValue("confirmPassword", e.target.value) }}
                    className='border'
                    onBlur={handleBlur}
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                <br/>
                <br/>
                <button 
                type='submit' 
                disabled={isSubmitting}
                className='border'
                >{isSubmitting ? "Submitting..." : "Submit"}</button>
            </div>
        </div>
    )
}

export default UserSignUpForm;
