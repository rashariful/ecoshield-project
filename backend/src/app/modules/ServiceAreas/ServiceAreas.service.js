
import { ServiceAreas } from "./ServiceAreas.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

// Create ServiceAreas
const createServiceAreas = async (payload) => {
    const result = await ServiceAreas.create(payload);
    return result;
}
    // Get all ServiceAreas
const getAllServiceAreas = async (query) => {
    const ServiceAreasSearchableFields = [];
    const resultQuery = new QueryBuilder(ServiceAreas.find(), query).search(ServiceAreasSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
    // Get single ServiceAreas
const getSingleServiceAreas = async (id) => {
    const result = await ServiceAreas.findById(id);
    return result;
}
    // Update ServiceAreas
const updateServiceAreas = async (id, payload) => {
    const result = await ServiceAreas.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
    // Delete ServiceAreas
const deleteServiceAreas = async (id) => {
    const result = await ServiceAreas.findByIdAndDelete(id);
    return result;
}

export const ServiceAreasServices = {
    createServiceAreas,
    getAllServiceAreas,
    getSingleServiceAreas,
    updateServiceAreas,
    deleteServiceAreas
}
