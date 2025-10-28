import Areas from "../Models/Areas.js";

const AreaServices = {};

AreaServices.getAreaByStateAndDistrict = async (state, district) => {
  try {
    const response = await Areas.find({ state, district, isActive: true });
    return {
        status: "OK",
        msg : "Successfully get all areas in district",
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

export default AreaServices;

