
import { Overview } from "./Overview.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

// Create Overview
const createOverview = async (payload) => {
    const result = await Overview.create(payload);
    return result;
}
    // Get all Overview
const getAllOverview = async (query) => {
    const OverviewSearchableFields = [];
    const resultQuery = new QueryBuilder(Overview.find(), query).search(OverviewSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
    // Get single Overview
const getSingleOverview = async (id) => {
    const result = await Overview.findById(id);
    return result;
}
    // Update Overview
const updateOverview = async (id, payload) => {
    const result = await Overview.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
    // Delete Overview
const deleteOverview = async (id) => {
    const result = await Overview.findByIdAndDelete(id);
    return result;
}

export const OverviewServices = {
    createOverview,
    getAllOverview,
    getSingleOverview,
    updateOverview,
    deleteOverview
}
