import Area from "../Models/Area.js";

const AreaServices = {}
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
