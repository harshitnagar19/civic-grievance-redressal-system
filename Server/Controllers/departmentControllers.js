// import Department from "../Models/Department.js";
import DepartmentServices from "../Services/DepartmentServices.js";
import { departmentSignUpValidationSchema } from "../Validations/DepartmentValidation.js";
import { generateToken } from "../utils/token/generateToken.js";
import hashPassword from "../utils/password/hashPassword.js";

const departmentControllers = {};
departmentControllers.signup = async (req, res) => {
    try {
        const { value, error } = departmentSignUpValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "ERR",
                msg: err.message,
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
               try{
                const token = generateToken({email:departmentObj.email , role:departmentObj.role});
                departmentObj["token"] = token
                return res.status(200).send({
                  status: "OK",
                  msg: "Department signup sucessfully",
                  data: [departmentObj],
                });
               }
               catch(err){
                return res.status(500).send({
                  status:"ERR",
                  msg:"error in server while generating token",
                  data:[]
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
            status:"ERR",
            msg:"department already register with given email",
            data:[]
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

export default departmentControllers;