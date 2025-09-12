import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departmentName: "",
    headOfDepartment: "",
    departmentShortName: "",
    email: "",
    password: "",
    mobileNumber: "",
    city: "",
    state: "",
    deptAddress: "",
    solve_issue: [],
    role: "",
    _id: "",
    departmentId: "",
    createdAt: '',
    updatedAt: ''
}

const departmentDataSlice = createSlice({
    name: "departmentData",
    initialState,
    reducers: {
        addDeptData: (state, action) => {
            state.departmentName = action.payload.departmentName;
            state.headOfDepartment = action.payload.headOfDepartment;
            state.departmentShortName = action.payload.departmentShortName;
            state.email = action.payload.email;
            state.password = action.payload.password; // Fixed typo
            state.mobileNumber = action.payload.mobileNumber;
            state.city = action.payload.city;
            state.state = action.payload.state;
            state.deptAddress = action.payload.deptAddress;
            state.solve_issue = action.payload.solve_issue;
            state.role = action.payload.role;
            state._id = action.payload._id;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state.departmentId = action.payload.departmentId;
        },
       
        clearDeptData: (state) => {
            return initialState;
        },
        updateDeptEmail: (state, action) => {
            state.email = action.payload;
        }
    },
});

export const { addDeptData, clearDeptData, updateDeptEmail } = departmentDataSlice.actions;
export default departmentDataSlice.reducer;
