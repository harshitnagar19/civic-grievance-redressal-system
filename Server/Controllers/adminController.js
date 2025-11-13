import express from "express";
import { userLoginValidationSchema } from "../Validations/UserValidation.js";
import { generateToken } from "../utils/token/generateToken.js";
import AdminService from "../Services/AdminServices.js";

const adminController = {};

adminController.login = async (req,res)=>{
    try {
        const { value, error } = userLoginValidationSchema.validate(req.body);
        //in-valid body
        if (error) {
          return res.status(400).send({
            status: "ERR",
            msg: error.message,
            data: [],
          });
        } else {
          const user = await AdminService.getAdminByEmail(value.email);
          if (user.status == "ERR") {
            return res.status(500).send({
              status: "ERR",
              msg: "error at server in admin login",
              data: [],
            });
          }
          if (user.status == "OK" && user.data.length == 0) {
            return res.status(400).send({
              status: "ERR",
              msg: "Admin not register with enterd mail",
              data: [],
            });
          }
          if (user.status == "OK" && user.data.length > 0) {
            try {
              let isPasswordCorrect = true;
              if(user.data[0].password==value.password){
                isPasswordCorrect = true;
              }else{
                isPasswordCorrect = false;
              }
              if (isPasswordCorrect) {
                const userObj = user.data[0].toObject();
                delete userObj.password;
    
                try {
                  const token = generateToken({
                    email: userObj.email,
                    role: "admin",
                  });
                  userObj["token"] = token;
                  return res.status(200).send({
                    status: "OK",
                    msg: "admin login sucessfully",
                    data: [userObj],
                  });
                } catch (authErr) {
                  return res.status(500).send({
                    status: "ERR",
                    msg: authErr.message,
                    data: [],
                  });
                }
              } else {
                return res.status(400).send({
                  status: "ERR",
                  msg: "invalid password",
                  data: [],
                });
              }
            } catch (err) {
              return res.status(500).send({
                status: "ERR",
                msg: err.message,
                data: [],
              });
            }
          }
        }
      } catch (err) {
        res.status(500).send({
          status: "ERR",
          msg: `err in server at admin login , ${err.message}`,
          data: [],
        });
      }
}

export default adminController;