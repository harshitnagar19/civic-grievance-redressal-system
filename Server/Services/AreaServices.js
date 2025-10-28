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
}
AreaServices.getDistinctTypesWithWardStatus = async () => {
  try {
    const types = await Area.distinct("type");

    const result = await Promise.all(
      types.map(async (type) => {
        const hasWard = await Area.exists({
          type,
          wardNumber: { $ne: null },
        });
        return {
          type,
          isWardExists: !!hasWard,
        };
      })
    );
    return result;
  } catch (error) {
    throw new Error("Error fetching types: " + error.message);
  }
};

export default AreaServices;

