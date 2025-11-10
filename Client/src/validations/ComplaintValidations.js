import { object, string, number, mixed } from "yup";

export const ComplaintValidations = object({
  userEmail: string().email("Invalid email format").nullable(),

  title: string()
    .required("Complaint title is required")
    .min(5, "Minimum 5 characters required")
    .max(100, "Title can't exceed 100 characters"),

  description: string()
    .required("Complaint description is required")
    .min(20, "Minimum 20 characters required")
    .max(1000, "Description can't exceed 1000 characters"),

  department: string().
    required("Please select a department"),

  state: string().
    required("State is required"),

  district: string().
    required("District is required"),

  image: object({
    file: mixed()
      .nullable()
      .test("fileSize", "File size too large", value => !value || value.size <= 2 * 1024 * 1024)
      .test("fileType", "Unsupported format", value =>
        !value || ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),
    url: string().nullable(),
  }),
});
