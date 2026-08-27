"use client";

import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { overviewColumns } from "@/utils/tableConfigs";
import { overviewFormFields } from "@/utils/formSchemas";
import {
  useGetAllOverviewQuery,
  useCreateOverviewMutation,
  useUpdateOverviewMutation,
  useDeleteOverviewMutation,
} from "@/redux/api/overviewApi";

const OverviewPage: React.FC = () => {
  const { data: overviews, isLoading, refetch } = useGetAllOverviewQuery();
  const [createOverview] = useCreateOverviewMutation();
  const [updateOverview] = useUpdateOverviewMutation();
  const [deleteOverview] = useDeleteOverviewMutation();

  // ----- Handle Add -----
  const handleAdd = async (data: any) => {
    try {
      await createOverview(data).unwrap(); // send JSON directly
      message.success("Overview added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add overview");
    }
  };

  // ----- Handle Edit -----
  const handleEdit = async (id: string, data: any) => {
    try {
      await updateOverview({ id, data }).unwrap(); // send JSON directly
      message.success("Overview updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update overview");
    }
  };

  // ----- Handle Delete -----
  const handleDelete = async (id: string | number) => {
    try {
      await deleteOverview(id).unwrap();
      message.success("Overview deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete overview");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Overview Management"
        subtitle="Manage your overview data here"
        data={Array.isArray(overviews?.data) ? overviews.data : []}
        columns={overviewColumns}
        formFields={overviewFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default OverviewPage;
