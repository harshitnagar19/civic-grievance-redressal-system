import Joi from "joi";

export const departmentSignUpValidationSchema = Joi.object({
  DepartmentName: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Department name should be text",
    "string.empty": "Department name cannot be empty",
    "string.min": "Department name should have at least 3 characters",
    "string.max": "Department name should not exceed 100 characters",
    "any.required": "Department name is required",
  }),

  DepartmentShortName: Joi.string()
    .valid("ELEC", "WATER", "ROAD", "EDU", "HEALTH", "ENV", "SEVAGE")
    .required()
    .messages({
      "any.only": "Department short name must be one of the predefined values",
      "any.required": "Department short name is required",
    }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().trim().min(6).required().messages({
    "string.min": "Password should have at least 6 characters",
    "any.required": "Password is required",
  }),

  mobileNumber: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Mobile number must be a valid Indian number (10 digits starting with 6-9)",
      "any.required": "Mobile number is required",
    }),

  city: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "City should be text",
    "string.empty": "City cannot be empty",
    "string.min": "City should have at least 2 characters",
    "string.max": "City should not exceed 50 characters",
    "any.required": "City is required",
  }),

  state: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "State should be text",
    "string.empty": "State cannot be empty",
    "string.min": "State should have at least 2 characters",
    "string.max": "State should not exceed 50 characters",
    "any.required": "State is required",
  }),

  solve_issue: Joi.array()
    .items(Joi.string().min(3).max(50))
    .messages({
      "array.base": "solve_issue must be an array of strings",
      "string.min": "Each issue should have at least 3 characters",
      "string.max": "Each issue should not exceed 50 characters",
    })
    .optional(),

  role: Joi.string().valid("department").default("department").messages({
    "any.only": "Role must be 'department'",
  }),
}).required();
