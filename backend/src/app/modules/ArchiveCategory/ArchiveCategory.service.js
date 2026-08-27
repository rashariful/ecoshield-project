
import { ArchiveCategory } from "./ArchiveCategory.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

// Create ArchiveCategory
const createArchiveCategory = async (payload) => {
    const result = await ArchiveCategory.create(payload);
    return result;
}
    // Get all ArchiveCategory
const getAllArchiveCategory = async (query) => {
    const ArchiveCategorySearchableFields = [];
    const resultQuery = new QueryBuilder(ArchiveCategory.find(), query).search(ArchiveCategorySearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
    // Get single ArchiveCategory
const getSingleArchiveCategory = async (id) => {
    const result = await ArchiveCategory.findById(id);
    return result;
}
    // Update ArchiveCategory
const updateArchiveCategory = async (id, payload) => {
    const result = await ArchiveCategory.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
    // Delete ArchiveCategory
const deleteArchiveCategory = async (id) => {
    const result = await ArchiveCategory.findByIdAndDelete(id);
    return result;
}

export const ArchiveCategoryServices = {
    createArchiveCategory,
    getAllArchiveCategory,
    getSingleArchiveCategory,
    updateArchiveCategory,
    deleteArchiveCategory
}
