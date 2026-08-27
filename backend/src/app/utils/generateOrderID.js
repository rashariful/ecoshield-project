import { Sales } from "../modules/sales/sales.model.js";

const generateOrderID = async () => {
  const lastOrder = await Sales.findOne({}, { orderId: 1 })
    .sort({ createdAt: -1 })
    .lean();

  const year = new Date().getFullYear().toString().slice(-2); // e.g., "25"

  if (lastOrder?.orderId?.startsWith(`IMS${year}`)) {
    const numericPart = parseInt(lastOrder.orderId.slice(5)) || 0;
    const nextNumber = numericPart + 1;
    const padded = nextNumber.toString().padStart(5, "0");

    return `IMS${year}${padded}`;
  }

  // If no valid order or wrong format
  return `IMS${year}00001`;
};

export default generateOrderID;
