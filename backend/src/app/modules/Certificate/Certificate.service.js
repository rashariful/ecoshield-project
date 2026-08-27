import { Certificate } from "./Certificate.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";
// Declare the Services

// Create Certificate
const createCertificate = async (file, payload) => {
  try {
    if (!payload.name) throw new Error("Name is  required.");
    if (file?.buffer) {
      const imageName = `certificatem${Date.now()}`;

      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer,
      );
      payload.thumbnail = secure_url;
    }

    const result = await Certificate.create(payload);
    return result;
  } catch (error) {
    console.error("Failed to create Certificate:", error);
    throw new Error("Failed to create Certificate: " + error.message);
  }
};
// Get all Certificate
const getAllCertificate = async (query) => {
  const CertificateSearchableFields = [];
  const resultQuery = new QueryBuilder(Certificate.find(), query)
    .search(CertificateSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();

  return {
    data: result,
    meta,
  };
};
// Get single Certificate
const getSingleCertificate = async (id) => {
  const result = await Certificate.findById(id);
  return result;
};
// Update Certificate
const updateCertificate = async (id,file, payload) => {
 try {
     const certificate = await Certificate.findById(id);
     if (!certificate) {
       throw new Error("Certificate not found");
     }
 
     // যদি নতুন ফাইল থাকে, তাহলে ক্লাউডিনারিতে আপলোড করো
     if (file?.buffer) {
       const imageName = `certificate${Date.now()}`;
       const { secure_url } = await sendImageToCloudinary(
         imageName,
         file.buffer
       );
       payload.thumbnail = secure_url;
     } else {
       // নতুন thumbnail না থাকলে পুরোনোটা রেখে দাও
       payload.thumbnail = certificate.thumbnail;
     }
 
     const result = await Certificate.findByIdAndUpdate(id, payload, {
       new: true,
       runValidators: true,
     });
 
     return result;
   } catch (error) {
     console.error("Failed to update certificate:", error);
     throw new Error("Failed to update certificate: " + error.message);
   }
};
// Delete Certificate
const deleteCertificate = async (id) => {
  const result = await Certificate.findByIdAndDelete(id);
  return result;
};

export const CertificateServices = {
  createCertificate,
  getAllCertificate,
  getSingleCertificate,
  updateCertificate,
  deleteCertificate,
};
