import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import logo2 from "../../assets/logo2.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Upload, X, Mail, FileText, MapPin, Building2, Image as ImageIcon } from "lucide-react";

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
    values.userEmail = userEmail;
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

  // Fetch districts
  useEffect(() => {
    if (!values.state) return;
    console.log(values.state);

    const getDistrict = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/department/get-all-districts-of-state?state=${values.state}`
        );
        setDistricts(res.data.data);
      } catch (error) {
        notifyError(error.response?.data?.msg || "Failed to fetch districts");
      }
    };
    getDistrict();
  }, [values.state]);

  // Fetch departments
  useEffect(() => {
    if (!values.state || !values.district) return;
    console.log(values.district);
    const getDepartment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/department/get-all-department-of-district?district=${values.district}&state=${values.state}`
        );
        setDepartment(res.data.data);
      } catch (error) {
        console.log(error);
        notifyError(error.response?.data?.msg || "Failed to fetch departments");
      }
    };
    getDepartment();
  }, [values.district]);

  // Ward existence logic
  useEffect(() => {
    const selected = areaType.find((a) => a.type === values.location?.type);
    setIsWardExist(selected?.isWardExists ?? false);

  }, [values.location?.type, areaType]);
  const stateOptions = states.map((s) => ({ value: s, label: s }));
  const districtOptions = districts.map((d) => ({ value: d, label: d }));
  const departmentOptions = department.map((dep) => ({ value: dep, label: dep }));
  const areaTypeOptions = areaType.map((a) => ({ value: a.type, label: a.type }));

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      padding: '6px',
      borderRadius: '0.75rem',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      '&:active': {
        backgroundColor: '#3b82f6',
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Raise a Complaint
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill out the form below to submit your complaint
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* Email Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email Address
              </label>
              <Field
                type="email"
                name="userEmail"
                readOnly
                value={userEmail}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                onBlur={handleBlur}
              />
              <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm mt-1.5 flex items-center gap-1" />
            </div>

            {/* Title Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Complaint Title
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Enter a brief title for your complaint"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1.5" />
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Describe your complaint in detail..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1.5" />
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  State
                </label>
                <Select
                  options={stateOptions}
                  value={stateOptions.find((opt) => opt.value == values.state)}
                  onChange={(selected) => {
                    setFieldValue("state", selected.value);
                    setFieldValue("district", "");
                    setFieldValue("location.state", selected.value);
                    setFieldValue("location.district", "");
                  }}
                  placeholder="Select State"
                  styles={customSelectStyles}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  District
                </label>
                <Select
                  options={districtOptions}
                  value={districtOptions.find((opt) => opt.value === values.district)}
                  onChange={(selected) => {
                    setFieldValue("district", selected.value);
                    setFieldValue("location.district", selected.value);
                  }}
                  placeholder="Select District"
                  isDisabled={!values.state}
                  styles={customSelectStyles}
                />
              </div>
            </div>

            {/* Department */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                Department
              </label>
              <Select
                options={departmentOptions}
                value={departmentOptions.find((opt) => opt.value === values.department)}
                onChange={(selected) => setFieldValue("department", selected.value)}
                placeholder="Select Department"
                isDisabled={!values.district}
                styles={customSelectStyles}
              />
            </div>

            {/* Location Section */}
            <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Location Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Area Type</label>
                  <Select
                    options={areaTypeOptions}
                    value={areaTypeOptions.find((opt) => opt.value === values.location?.type)}
                    onChange={(selected) => setFieldValue("location.type", selected.value)}
                    placeholder="Select type"
                    styles={customSelectStyles}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Ward Number</label>
                  <Field
                    disabled={!isWardExist}
                    type="number"
                    name="location.wardNumber"
                    placeholder="Ward #"
                    value={values.location?.wardNumber || ""}
                    onChange={(e) => setFieldValue("location.wardNumber", e.target.value)}
                    className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      isWardExist ? "" : "cursor-not-allowed opacity-50 bg-gray-100"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Area Name</label>
                  <Field
                    type="text"
                    name="location.areaName"
                    placeholder="Area name"
                    value={values.location?.areaName || ""}
                    onChange={(e) => setFieldValue("location.areaName", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Upload Supporting Image
              </label>
              
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFieldValue("image.file", e.target.files[0]);
                    setFieldValue("image.url", URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="hidden"
              />
              
              {!values.image?.url ? (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition duration-200 group"
                >
                  <Upload className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition mb-3" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                  <img 
                    src={values.image.url} 
                    alt="Preview" 
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue("image.file", null);
                      setFieldValue("image.url", "");
                    }}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">Image uploaded successfully</p>
                  </div>
                </div>
              )}
              
              <ErrorMessage name="image.file" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-semibold text-base rounded-xl shadow-lg transition duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
              ) : (
                "Submit Complaint"
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your complaint will be reviewed and processed within 24-48 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;