import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { ComplaintForm } from "./ComplaintForm";
import { ComplaintValidations } from "../../validations/ComplaintValidations";

const CLOUD_NAME = "dvvae8cxm";
const UPLOAD_PRESET = "unsigned_upload";

export const ComplaintWrapper = () => {
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
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const initialValues = {
    state: "",
    district: "",
    location: {
      type: "",
      wardNumber: "",
      areaName: "",
      district: "",
      state: "",
    },
    department: "",
    userEmail: "",
    title: "",
    description: "",
    image: { file: null, url: "" },
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let uploadedUrl = values.image?.url;
      if (values.image?.file) {
        uploadedUrl = await handleUpload(values.image.file);
        values.image.url = uploadedUrl;
      }

      console.log("Final submitted data:", values);
        } catch (error) {
      console.error(error);
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
