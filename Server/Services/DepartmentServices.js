import Department from "../Models/Department.js";

const DepartmentServices = {};

DepartmentServices.getDepartmentByEmail = async (email) => {
  try {
    const departmentData = await Department.findOne({ email });
    if (departmentData) {
      return {
        status: "OK",
        msg: "Department Found Sucessfully",
        data: [departmentData],
      };
    } else {
      return {
        status: "OK",
        msg: "Department Not Found With Given Email",
        data: [],
      };
    }
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

DepartmentServices.signup = async ({
  DepartmentName,
  DepartmentShortName,
  HeadOfDepartment,
  email,
  password,
  mobileNumber,
  city,
  state,
  deptAddress,
  solve_issue = [],
  role = "department",
}) => {
  try {
    const signupData = await Department.create({
      DepartmentName,
      DepartmentShortName,
      HeadOfDepartment,
      email,
      password,
      mobileNumber,
      city,
      state,
      deptAddress,
      solve_issue,
      role,
    });

    return {
      status: "OK",
      msg: "Department SignUp Successfully",
      data: [signupData],
    };
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

DepartmentServices.getStatesOfAllDepartment = async () => {
  try {
    const response = await Department.distinct("state")
    return {
      status:"OK",
      msg:"sucessfully get all states",
      data:response
    }
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

DepartmentServices.getAllDistrictsInState = async ({state})=>{
  try{
    const response = await Department.distinct("city",{state});
    return {
      status:"OK",
      msg:"sucessfully get all districts in state",
      data:response
    }

  }catch(err){
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
}

DepartmentServices.getAllDepartmentInDisrtict = async ({state , district}) =>{
  try{
    const response = await Department.distinct("DepartmentName" , {state , city:district , isVerified:true})
    return {
      status:"OK",
      msg:"sucessfully get all districts in state",
      data:response
    }
  }catch(err){
      return {
        status: "ERR",
        msg: err.message,
        data: [],
      };
  }
}

DepartmentServices.getDepartmentInfo = async ({state,district,departmentName})=>{
  try{
    const response = await Department.find({state, DepartmentName:departmentName, city:district, isVerified:true})
    return {
      status:"OK",
      msg:"sucessfully get Department Info",
      data:response
    }
  }catch(err){
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
}

DepartmentServices.getDepartmentByStateAndDistrict = async (state, district , DepartmentShortName ,isVerified) => {
  try {
    const response = await Department.find({ state, city: district, DepartmentShortName , isVerified: true });
    return {
      status: "OK",
      msg: "sucessfully get all departments in district",
      data: response
    };
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

export default DepartmentServices;
