import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { serviceAreaColumns } from "@/utils/tableConfigs";
import { serviceAreaFormFields } from "@/utils/formSchemas";
import {
  useGetAllServiceAreaQuery,
  useCreateServiceAreaMutation,
  useUpdateServiceAreaMutation,
  useDeleteServiceAreaMutation,
} from "@/redux/api/serviceAreaApi";

type ServiceAreaFormData = {
  name: string;
  isActive?: boolean;
  priority?: number;
};

const ServiceAreaPage: React.FC = () => {
  const { data: serviceAreas, isLoading, refetch } = useGetAllServiceAreaQuery();

  const [createServiceArea] = useCreateServiceAreaMutation();
  const [updateServiceArea] = useUpdateServiceAreaMutation();
  const [deleteServiceArea] = useDeleteServiceAreaMutation();

  // Handle add
  const handleAdd = async (data: ServiceAreaFormData) => {
    try {
      await createServiceArea(data).unwrap();
      message.success("Service area added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add service area");
    }
  };

  // Handle edit
  const handleEdit = async (id: string, data: ServiceAreaFormData) => {
    try {
      await updateServiceArea({ id, data }).unwrap();
      message.success("Service area updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update service area");
    }
  };

  // Handle delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteServiceArea(id).unwrap();
      message.success("Service area deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete service area");
    }
  };

  // Toggle isActive
  const handleToggle = async (id: string, checked: boolean) => {
    try {
      await updateServiceArea({ id, data: { isActive: checked } }).unwrap();
      message.success(
        `Service area ${checked ? "activated" : "deactivated"} successfully`
      );
      refetch();
    } catch {
      message.error("Failed to update service area status");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Service Area Management"
        subtitle="Manage all service areas here"
        data={Array.isArray(serviceAreas?.data) ? serviceAreas.data : []}
        columns={serviceAreaColumns}
        formFields={serviceAreaFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </section>
  );
};

export default ServiceAreaPage;
