import { FormField } from "@/components/common/FormBuilder/FormBuilder";
import dayjs from "dayjs";
export function convertRecordForForm(record: any, fields: FormField[]) {
  const result: any = { ...record };

  fields.forEach((field) => {
    // --- 1) Date Fields ---
    if (field.type === "date" && record[field.name]) {
      result[field.name] = dayjs(record[field.name]);
    }

    // --- 2) dynamicList Fields (main FIX) ---
    if (field.type === "dynamicList" && Array.isArray(record[field.name])) {
      result[field.name] = record[field.name].map((item: any) => {
        // If the value is string → convert to object
        if (typeof item === "string") {
          return { [field.fields[0].name]: item };
        }
        return item;
      });
    }
  });

  return result;
}

// import { FormField } from "@/components/common/FormBuilder/FormBuilder";
// import dayjs from "dayjs";


// export const convertRecordForForm = <T>(record: T, formFields: FormField[]) => {
//   const safeValues: any = { ...record };

//   formFields.forEach((field) => {
//     if (field.type === "date" && record[field.name]) {
//       safeValues[field.name] = dayjs(record[field.name]);
//     }

//     if (field.type === "dynamicList" && field.fields) {
//       const list = record[field.name];
//       if (Array.isArray(list)) {
//         safeValues[field.name] = list.map((item: any) => {
//           const newItem: any = { ...item };
//           field.fields!.forEach((sub) => {
//             if (sub.type === "date" && item[sub.name]) {
//               newItem[sub.name] = dayjs(item[sub.name]);
//             }
//           });
//           return newItem;
//         });
//       }
//     }
//   });

//   return safeValues;
// };
