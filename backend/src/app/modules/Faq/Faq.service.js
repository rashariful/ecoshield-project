
import { Faq } from "./Faq.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";

// Declare the Services 

// Create Faq
const createFaq = async (payload) => {
    const result = await Faq.create(payload);
    return result;
}
    // Get all Faq
const getAllFaq = async (query) => {
    const FaqSearchableFields = [];
    const resultQuery = new QueryBuilder(Faq.find(), query).search(FaqSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
    // Get single Faq
const getSingleFaq = async (id) => {
    const result = await Faq.findById(id);
    return result;
}
    // Update Faq
const updateFaq = async (id, payload) => {
    const result = await Faq.findByIdAndUpdate(id, payload, { new: true, runValidators: true});
    return result;
}
    // Delete Faq
const deleteFaq = async (id) => {
    const result = await Faq.findByIdAndDelete(id);
    return result;
}

export const FaqServices = {
    createFaq,
    getAllFaq,
    getSingleFaq,
    updateFaq,
    deleteFaq
}
