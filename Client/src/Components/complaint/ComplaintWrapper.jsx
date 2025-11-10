import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { ComplaintForm } from "./ComplaintForm";
import { ComplaintValidations } from "../../validations/ComplaintValidations";
import { toast } from "react-toastify";

const CLOUD_NAME = "dvvae8cxm";
const UPLOAD_PRESET = "unsigned_upload";

export const ComplaintWrapper = () => {
  const token=localStorage.getItem("token");
  //Image upload handling
  const handleUpload = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      return {
        url: res.data.secure_url,
        public_id: res.data.public_id,
      };
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const initialValues = {
    state: "",
    district: "",
    location: {
      type: "",
      wardNumber: null,
      areaName: "",
      district: "",
      state: "",
    },
    department: "",
    userEmail: "",
    title: "",
    description: "",
    image: {
      url: "",
      public_id: "",
    },
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("values: " ,values);
    
    try {
      // Upload image if file exists
      if (values.image?.file) {
        const uploaded = await handleUpload(values.image.file);
        if (uploaded) {
          values.image.url = uploaded.url;
          values.image.public_id = uploaded.public_id;
        }
        delete values.image.file; // remove file object from data
      }

      // Send complaint data to your backend
      
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/complain/add`,
        values,{ headers: { token: token } }
      );
      
      toast.success("Complaint submitted successfully!");
      console.log("Complaint saved:", res.data);
    } catch (error) {
      toast.error("Failed to submit complaint");
      console.error("Error while submitting complaint:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ComplaintValidations}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <ComplaintForm formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default ComplaintWrapper;
