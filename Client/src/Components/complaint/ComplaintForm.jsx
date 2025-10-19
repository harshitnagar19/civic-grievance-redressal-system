import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import logo2 from "../../assets/logo2.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const ComplaintForm = ({ formikProps }) => {
  const { values, setFieldValue, isSubmitting, handleBlur } = formikProps;
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [department, setDepartment] = useState([]);
  const [areaType, setAreaType] = useState([]);
  const [isWardExist, setIsWardExist] = useState(false);
  const userEmail = useSelector((state) => state.userData.email);
  const notifyError = (err) => toast.error(err);

  // Fetch all states
  useEffect(() => {
    const getAllState = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/department/get-all-state-of-department`
        );
        setStates(res.data.data);
      } catch (error) {
        notifyError(error.response?.data?.msg || "Failed to fetch states");
      }
    };
    getAllState();
  }, []);

  // Fetch districts
  useEffect(() => {
    if (!states.length) return;
    const getDistrict = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/department/get-all-districts-of-state?state=Madhya Pradesh`
        );
        setDistricts(res.data.data);
      } catch (error) {
        notifyError(error.response?.data?.msg || "Failed to fetch districts");
      }
    };
    getDistrict();
  }, [states]);

  // Fetch departments
  useEffect(() => {
    if (!districts.length) return;
    const getDepartment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/department/get-all-department-of-district?district=Dewas&state=Madhya Pradesh`
        );
        setDepartment(res.data.data);
      } catch (error) {
        notifyError(error.response?.data?.msg || "Failed to fetch departments");
      }
    };
    getDepartment();
  }, [districts]);

  // Fetch area types
  useEffect(() => {
    const getArea = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASEURL}/area/types`);
        setAreaType(res.data.data);
      } catch (error) {
        notifyError(error.response?.data?.msg || "Failed to fetch area types");
      }
    };
    getArea();
  }, []);

  // Ward existence logic
  useEffect(() => {
    const selected = areaType.find((a) => a.type === values.location?.type);
    setIsWardExist(selected?.isWardExists ?? false);
  }, [values.location?.type, areaType]);

  const stateOptions = states.map((s) => ({ value: s, label: s }));
  const districtOptions = districts.map((d) => ({ value: d, label: d }));
  const departmentOptions = department.map((dep) => ({ value: dep, label: dep }));
  const areaTypeOptions = areaType.map((a) => ({ value: a.type, label: a.type }));

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
                readOnly
                value={userEmail}
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

            {/* State & District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <Select
                  options={stateOptions}
                  value={stateOptions.find((opt) => opt.value === values.state)}
                  onChange={(selected) => {
                    setFieldValue("state", selected.value);
                    setFieldValue("district", "");
                    setFieldValue("location.state", selected.value);
                    setFieldValue("location.district", "");
                  }}
                  placeholder="Select State"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                <Select
                  options={districtOptions}
                  value={districtOptions.find((opt) => opt.value === values.district)}
                  onChange={(selected) => {
                    setFieldValue("district", selected.value);
                    setFieldValue("location.district", selected.value);
                  }}
                  placeholder="Select District"
                  isDisabled={!values.state}
                />
              </div>
            </div>

            {/* Department */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <Select
                options={departmentOptions}
                value={departmentOptions.find((opt) => opt.value === values.department)}
                onChange={(selected) => setFieldValue("department", selected.value)}
                placeholder="Select Department"
                isDisabled={!values.district}
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <Select
                  options={areaTypeOptions}
                  value={areaTypeOptions.find((opt) => opt.value === values.location?.type)}
                  onChange={(selected) => setFieldValue("location.type", selected.value)}
                  placeholder="Select area type"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ward Number</label>
                <Field
                  disabled={!isWardExist}
                  type="number"
                  name="location.wardNumber"
                  placeholder="Ward Number"
                  value={values.location?.wardNumber || ""}
                  onChange={(e) => setFieldValue("location.wardNumber", e.target.value)}
                  className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition ${isWardExist ? "" : "cursor-not-allowed opacity-50"}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area Name</label>
                <Field
                  type="text"
                  name="location.areaName"
                  placeholder="Area Name"
                  value={values.location?.areaName || ""}
                  onChange={(e) => setFieldValue("location.areaName", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  onChange={e => {
                    if (e.target.files[0]) {
                      setFieldValue("image.file", e.target.files[0]);
                      setFieldValue("image.url", URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition duration-200"
                >
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                  </div>
                </label>
                {values.image?.url && (
                  <div className="mt-4 relative">
                    <img src={values.image.url} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-gray-300" />
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue("image.file", null);
                        setFieldValue("image.url", "");
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <ErrorMessage name="image.file" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl focus:ring-4 focus:ring-blue-300 transition duration-200 shadow-lg ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
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
