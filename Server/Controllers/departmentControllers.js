// import Department from "../Models/Department.js";
import DepartmentServices from "../Services/DepartmentServices.js";
import { departmentSignUpValidationSchema , departmentLoginValidationSchema } from "../Validations/DepartmentValidation.js";
import { generateToken } from "../utils/token/generateToken.js";
import hashPassword from "../utils/password/hashPassword.js";
import verifyPassword from "../utils/password/verifyPassword.js";

const departmentControllers = {};
departmentControllers.signup = async (req, res) => {
  try {
    const { value, error } = departmentSignUpValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "ERR",
        msg: error.message,
        data: [],
      });
    }
    else {
      const existingDepartment = await DepartmentServices.getDepartmentByEmail(value?.email);
      //error while finding department
      if (existingDepartment?.status == "ERR") {
        return res.status(500).send(existingDepartment);
      }
      if (existingDepartment?.status == "OK") {
        // department not found , means need to signup
        if (existingDepartment.data.length == 0) {
          try {
            const hashedPassword = await hashPassword(value.password);
            value.password = hashedPassword;
            const registerDepartment = await DepartmentServices.signup(value);
            if (registerDepartment.status == "OK") {
              const departmentObj = registerDepartment.data[0].toObject();
              delete departmentObj.password;
              try {
                const token = generateToken({ email: departmentObj.email, role: departmentObj.role });
                departmentObj["token"] = token
                return res.status(200).send({
                  status: "OK",
                  msg: "Department signup sucessfully",
                  // data: [departmentObj],
                  data:[]
                });
              }
              catch (err) {
                return res.status(500).send({
                  status: "ERR",
                  msg: "error in server while generating token",
                  data: []
                })
              }
            } else {
              return res.status(500).send({
                status: "ERR",
                msg: `error at signup service while signup user ${registerDepartment.msg}`,
                data: [],
              });
            }
          } catch (err) {
            // error while hashing password
            return res.status(500).send({
              status: "ERR",
              msg: err.message,
              data: [],
            });
          }
        } else {
          // department founded means already register eith id
          return res.status(400).send({
            status: "ERR",
            msg: "department already register with given email",
            data: []
          });
        }
      }




    }
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: `error at server while signup department ${err.message}`,
      data: [],
    });
  }
}

departmentControllers.login = async (req, res) => {
  try {
    const { value, error } = departmentLoginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: "ERR",
        msg: error.message,
        data: [],
      });
    } else {
      const department = await DepartmentServices.getDepartmentByEmail(value.email)
      if (department.status == "ERR") {
        return res.status(500).send({
          status: "ERR",
          msg: "error at server in department login",
          data: []
        })
      }
      if (department.status == "OK" && department.data.length == 0) {
        return res.status(400).send({
          status: "ERR",
          msg: "Department not register with entered mail",
          data: []
        })
      }
      if (department.status == "OK" && department.data.length > 0) {
        try {
          const departmentObj = department.data[0];
            // check department verified or not
          if (!departmentObj.isVerified) {
            return res.status(403).send({
              status: "ERR",
              msg: "Department not verified yet. Contact admin for approval.",
              data: []
            });
          }
          // verify pwd
          const isPasswordCorrect = await verifyPassword(value.password, departmentObj.password)
          if (isPasswordCorrect) {
            // Remove password before sending
            const deptWithoutPassword = departmentObj.toObject();
            delete deptWithoutPassword.password;
            try {
                const token = generateToken({
                  email: deptWithoutPassword.email,
                  role: deptWithoutPassword.role,
                });
                deptWithoutPassword["token"] = token;
                return res.status(200).send({
                  status: "OK",
                  msg: "Department Login sucessfully",
                  data: [deptWithoutPassword],
                });
              } catch (err) {
                return res.status(500).send({
                  status: "ERR",
                  msg: "error in server while generating token",
                  data: [],
                });
              }

          } else {
            return res.status(400).send({
              status: "ERR",
              msg: "invalid password",
              data: []
            })
          }
        } catch (err) {
          return res.status(500).send({
            status: "ERR",
            msg: err.message,
            data: []
          })
        }
      }
    }
  } catch (err) {
    res.status(500).send({
      status: "ERR",
      msg: `err in server at department login , ${err.message}`,
      data: [],
    });
  }
}

departmentControllers.refresh = async(req,res)=>{
  
  try {
    const {email ,role} = req.department;
    const response = await DepartmentServices.getDepartmentByEmail(email);

    if(response.status == "ERR"){
      return res.status(500).send({
        status : "ERR",
        msg : "error at server in department login",
        data: [],
      })
    }
    if(response.status == "OK" && response.data.length==0){
      return res.status(400).send({
        status: "ERR",
        msg: "department not register with enterd mail",
        data: [],
      })
    }
    if(response.status =="OK" && response.data.length>0){
      const departmentObj = response.data[0].toObject()
      delete departmentObj.password 
      res.status(200).send({
        status : "OK",
        msg:"department is valid",
        data:[departmentObj]
      })
    }

  } catch (error) {
    return res.status(500).send({
      status:"ERR",
      msg:"error in refresh at server",
      data:[]
    })
  }
}

export default departmentControllers;