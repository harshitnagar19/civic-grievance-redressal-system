import UserServices from "../Services/UserServices.js";
import hashPassword from "../utils/password/hashPassword.js";
import { generateToken } from "../utils/token/generateToken.js";
import { userSignUpValidationSchema } from "../Validations/UserValidation.js";

const userControllers = {};
userControllers.signup = async (req, res) => {
  try {
    const { value, error } = userSignUpValidationSchema.validate(req.body);
    //in-valid body
    if (error) {
      return res.status(400).json({
        status: "ERR",
        msg: err.message,
        data: [],
      });
    }
    //valid body
    else {
      const existingUser = await UserServices.getUserByEmail(value?.email);
      //  error while finding user
      if (existingUser?.status == "ERR") {
        return res.status(500).send(existingUser);
      }
      if (existingUser?.status == "OK") {
        // user not found , means need to signup
        if (existingUser.data.length == 0) {
          try {
            const hashedPassword = await hashPassword(value.password);
            value.password = hashedPassword;
            const registerUser = await UserServices.signup(value);
            if (registerUser.status == "OK") {
               const userObj = registerUser.data[0].toObject();
               delete userObj.password;
               try{
                const token = generateToken({email:userObj.email , role:userObj.role});
                userObj["token"] = token
                return res.status(200).send({
                  status: "OK",
                  msg: "user signup sucessfully",
                  data: [userObj],
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
                msg: `error at signup service while signup user ${registerUser.msg}`,
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
          // user founded means already register eith email
          return res.status(400).send({
            status:"ERR",
            msg:"user already register with given email",
            data:[]
          });
        }
      }
    }
  } catch (err) {
    // error at server while signup to user
    return res.status(500).send({
      status: "ERR",
      msg: `error at server while signup user ${err.message}`,
      data: [],
    });
  }
};

export default userControllers;
