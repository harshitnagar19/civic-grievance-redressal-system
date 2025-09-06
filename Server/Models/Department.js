import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  departmentId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  DepartmentName: {
    type: String,
    
  },
  DepartmentShortName: {
    type: String,
    required: true,
    enum: ["ELEC", "WATER", "ROAD", "EDU", "HEALTH", "ENV", "SEVAGE"],
   
  },
  email: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    
  },
  mobileNumber: {
    type: String,
    required: true,
   
  },
  city: {
    type: String,
  
  },
  state: {
    type: String,
    
  },
  solve_issue: {
    type: [String],
    default: []
  },
  role: {
    type: String,
    enum: ['department'],
    default: 'department'
  }
}, {
  timestamps: true,
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
