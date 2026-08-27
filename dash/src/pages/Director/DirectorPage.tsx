import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { directorColumns } from "@/utils/tableConfigs";
import { directorFormFields } from "@/utils/formSchemas";
import {
  useCreateDirectorMutation,
  useGetAllDirectorQuery,
  useUpdateDirectorMutation,
  useDeleteDirectorMutation,
} from "@/redux/api/directorApi";

const DirectorPage: React.FC = () => {
  const { data: directors, isLoading, refetch } = useGetAllDirectorQuery();
  const [createDirector] = useCreateDirectorMutation();
  const [updateDirector] = useUpdateDirectorMutation();
  const [deleteDirector] = useDeleteDirectorMutation();

  const convertToFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value?.originFileObj instanceof File) {
      formData.append(key, value.originFileObj);
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } 
    
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {

          // ⭐⭐ FIXED SPECIALTIES
          if ("specialty" in item) {
            formData.append(`${key}[${index}][specialty]`, item.specialty);
            return;
          }

          // Normal object arrays
          Object.entries(item).forEach(([subKey, subValue]) => {
            formData.append(`${key}[${index}][${subKey}]`, String(subValue));
          });
        } else {
          formData.append(`${key}[${index}]`, String(item));
        }
      });
    } 
    
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
};



  const handleAdd = async (data: any) => {
    try {
      const formData = convertToFormData(data);
      await createDirector(formData)
      message.success("Director added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add director");
    }
  };

  const handleEdit = async (id: string, data: any) => {
    try {
      const formData = convertToFormData(data);
      await updateDirector({ id, data: formData })
      message.success("Director updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update director");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteDirector(id)
      message.success("Director deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete director");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Director Management"
        subtitle="Manage your directors here"
        data={Array.isArray(directors?.data) ? directors.data : []}
        columns={directorColumns}
        formFields={directorFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default DirectorPage;
