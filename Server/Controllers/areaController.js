import express from "express";
import AreaServices from "../Services/AreaServices.js";

const areaController = {};

areaController.getTypes = async (req,res)=>{
    try{
        const data = await AreaServices.getDistinctTypesWithWardStatus();
        console.log("hello")
        return res.status(200).send({
            status:"OK",
            msg:"sucessfully find all types",
            data:data
        })
    }catch(err){
        res.status(500).send({
            status: "ERR",
            msg: `error in server to get all areaController, ${err.message}`,
            data: [],
          });
    }
}

export default areaController;