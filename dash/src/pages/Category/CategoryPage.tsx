"use client";

import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { categoryFormFields } from "@/utils/formSchemas";
import { categoryColumns } from "@/utils/tableConfigs";
import {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";

const CategoryPage: React.FC = () => {
  const { data: categories, isLoading, refetch } = useGetAllCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // ----- Handle Add -----
  const handleAdd = async (data: any) => {
    try {
      await createCategory(data).unwrap();
      message.success("Category added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add category");
    }
  };

  // ----- Handle Edit -----
  const handleEdit = async (id: string, data: any) => {
    try {
      await updateCategory({ id, data }).unwrap();
      message.success("Category updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update category");
    }
  };

  // ----- Handle Delete -----
  const handleDelete = async (id: string | number) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Category deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete category");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Category Management"
        subtitle="Manage your categories here"
        data={Array.isArray(categories?.data) ? categories.data : []}
        columns={categoryColumns}
        formFields={categoryFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default CategoryPage;
