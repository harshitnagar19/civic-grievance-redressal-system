import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import logo2 from "../../assets/logo2.png";
import { departmentData } from "../../data/departmentData/departmentData";
import { stateData } from "../../data/departmentData/stateData";

export const ComplaintForm = ({ formikProps }) => {
  const { values, setFieldValue, isSubmitting, handleBlur } = formikProps;

  const departmentOptions = departmentData.map(dep => ({
    value: dep.departmentName,
    label: dep.departmentName,
  }));

  const stateOptions = Object.keys(stateData).map(s => ({
    value: s,
    label: s,
  }));

  const districtOptions =
    values.state && stateData[values.state]
      ? stateData[values.state].map(d => ({ value: d, label: d }))
      : [];

  const priorityOptions = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" },
  ];

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${logo2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white opacity-70"></div>
      <div className="relative z-10 w-full h-full min-h-screen flex items-center justify-center py-8 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-5xl">
          <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 lg:p-16">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
              Raise a Complaint
            </h1>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <Field
                type="email"
                name="userEmail"
                placeholder="Enter your email"
                value={values.userEmail}
                onChange={(e) => setFieldValue("userEmail", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                onBlur={handleBlur}
              />
              <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Title */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter issue title"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Describe your issue in detail"
                rows="5"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Department */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <Select
                options={departmentOptions}
                value={departmentOptions.find(opt => opt.value === values.department)}
                onChange={(selected) => setFieldValue("department", selected.value)}
                placeholder="Select Department"
                className="w-full"
              />
              <ErrorMessage name="department" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <Select
                  options={stateOptions}
                  value={stateOptions.find(opt => opt.value === values.state)}
                  onChange={(selected) => {
                    setFieldValue("state", selected.value);
                    setFieldValue("district", "");
                    setFieldValue("location.state", selected.value);
                    setFieldValue("location.district", "");
                  }}
                  placeholder="Select State"
                  className="w-full"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                <Select
                  options={districtOptions}
                  value={districtOptions.find(opt => opt.value === values.district)}
                  onChange={(selected) => {
                    setFieldValue("district", selected.value);
                    setFieldValue("location.district", selected.value);
                  }}
                  placeholder="Select District"
                  isDisabled={!values.state}
                  className="w-full"
                />
                <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Location fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <Field
                  type="text"
                  name="location.type"
                  placeholder="Type"
                  value={values.location.type}
                  onChange={(e) => setFieldValue("location.type", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ward Number</label>
                <Field
                  type="number"
                  name="location.wardNumber"
                  placeholder="Ward Number"
                  value={values.location.wardNumber}
                  onChange={(e) => setFieldValue("location.wardNumber", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area Name</label>
                <Field
                  type="text"
                  name="location.areaName"
                  placeholder="Area Name"
                  value={values.location.areaName}
                  onChange={(e) => setFieldValue("location.areaName", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Priority */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
              <Select
                options={priorityOptions}
                value={priorityOptions.find(opt => opt.value === values.priority)}
                onChange={(selected) => setFieldValue("priority", selected.value)}
                placeholder="Select Priority"
                className="w-full"
              />
              <ErrorMessage name="priority" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Status */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <Field
                type="text"
                name="status"
                placeholder="Status"
                value={values.status}
                onChange={(e) => setFieldValue("status", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
              />
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFieldValue("image.url", URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-xl text-sm file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100 transition"
              />
              <ErrorMessage name="image.url" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl focus:ring-4 focus:ring-blue-300 transition duration-200 shadow-lg
                ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
