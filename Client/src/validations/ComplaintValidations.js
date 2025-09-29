import { object, string, mixed, number } from "yup";

export const ComplaintValidations = object({
  userEmail: string()
    .email("Invalid email format")
    .required("Email is required"),

  title: string()
    .required("Complaint title is required")
    .min(5, "Minimum 5 characters required")
    .max(100, "Title can't be longer than 100 characters"),

  description: string()
    .required("Complaint description is required")
    .min(20, "Minimum 20 characters required")
    .max(1000, "Description can't exceed 1000 characters"),

  department: string()
    .required("Please select a department"),

  state: string()
    .required("State is required")
    .min(2, "Minimum 2 characters required")
    .max(50, "State name can't be longer than 50 characters"),

  district: string()
    .required("District is required")
    .min(2, "Minimum 2 characters required")
    .max(50, "District name can't be longer than 50 characters"),

  priority: number()
    .required("Please select priority")
    .min(1, "Invalid priority value")
    .max(3, "Invalid priority value"),

  image: mixed()
    .nullable()
    .test(
      "fileSize",
      "File size is too large",
      value => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB max
    )
    .test(
      "fileFormat",
      "Unsupported file type",
      value =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value.type))
    ),
});
