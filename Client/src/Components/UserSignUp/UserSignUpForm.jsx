import React from 'react'
import { Field, ErrorMessage } from "formik";
const UserSignUpForm = ({ formikProps }) => {
    // console.log(formikProps)
    const { values, setFieldValue, isSubmitting, handleBlur ,validateOnChange} = formikProps;
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
  <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-lg sm:max-w-xl md:max-w-4xl mt-6 md:mt-0">

    {/* Logo Section (Responsive) */}
<div className="flex w-full lg:w-1/2">
  <img
    src="./logo.png"
    alt="Civic Eye Logo"
    className="w-full h-48 sm:h-60 md:h-72 lg:h-full object-contain p-4"
  />
</div>
    {/* Right Side - Form */}
    <div className="w-full md:w-1/2 p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Create Account</h1>
      </div>

      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">UserName</label>
      <Field
        type="text"
        name="userName"
        placeholder="Enter your username"
        value={values.name}
        onChange={(e) => setFieldValue("userName", e.target.value)}
        className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onBlur={handleBlur}
      />
      <ErrorMessage name="userName" component="div" className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4" />

      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Email</label>
      <Field
        type="text"
        name="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
        className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onBlur={handleBlur}
      />
      <ErrorMessage name="email" component="div" className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4" />

      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">MobileNumber</label>
      <Field
        type="text"
        name="mobileNumber"
        placeholder="Enter mobile number"
        value={values.mobile}
        onChange={(e) => setFieldValue("mobileNumber", e.target.value)}
        className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onBlur={handleBlur}
      />
      <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4" />

      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Password</label>
      <Field
        type="password"
        name="password"
        placeholder="Enter password"
        value={values.password}
        onChange={(e) => setFieldValue("password", e.target.value)}
        className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onBlur={handleBlur}
      />
      <ErrorMessage name="password" component="div" className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4" />

      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
      <Field
        type="password"
        name="confirmPassword"
        placeholder="Re-enter password"
        value={values.confirmPassword}
        onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        className="w-full p-2 sm:p-3 mb-4 sm:mb-6 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onBlur={handleBlur}
      />
      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs sm:text-sm mb-4 sm:mb-6" />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 sm:py-3 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition duration-200 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  </div>
</div>

    )
}

export default UserSignUpForm;
