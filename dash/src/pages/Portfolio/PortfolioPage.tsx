"use client";

import React, { useMemo } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { portfolioColumns } from "@/utils/tableConfigs";
import { portfolioFormFields } from "@/utils/formSchemas";
import {
  useCreatePortfolioMutation,
  useGetAllPortfolioQuery,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} from "@/redux/api/portfolioApi";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";

type PortfolioFormData = {
  title: string;
  subTitle: string;
  category?: string;
  images?: File[]; // multiple images upload
};

const PortfolioPage: React.FC = () => {
  // Fetch categories
  const { data: categoryData } = useGetAllCategoryQuery();

  // Fetch portfolios
  const { data: portfolios, isLoading, refetch } = useGetAllPortfolioQuery();
  const [createPortfolio] = useCreatePortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  // Convert object to FormData for API
  const convertToFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file: File) => formData.append(key, file));
      } else if (value && value.originFileObj instanceof File) {
        formData.append(key, value.originFileObj);
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return formData;
  };

  // ----- Handle Add -----
  const handleAdd = async (data: PortfolioFormData) => {
   
    try {
      const formData = convertToFormData(data);
      await createPortfolio(formData).unwrap();
      message.success("Portfolio added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add portfolio");
    }
  };

  // ----- Handle Edit -----
  const handleEdit = async (id: string, data: PortfolioFormData) => {
    try {
      const formData = convertToFormData(data);
      await updatePortfolio({ id, data: formData }).unwrap();
      message.success("Portfolio updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update portfolio");
    }
  };

  // ----- Handle Delete -----
  const handleDelete = async (id: string | number) => {
    try {
      await deletePortfolio(id).unwrap();
      message.success("Portfolio deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete portfolio");
    }
  };

  // ----- Dynamic form fields with category options -----
  const dynamicFormFields = useMemo(() => {
    const categoryOptions =
      categoryData?.data?.map((c: any) => ({
        label: c.name,
        value: c._id,
      })) || [];

    return portfolioFormFields.map((field) => {
      if (field.name === "category") {
        return { ...field, options: categoryOptions, dynamicOptions: true };
      }
      return field;
    });
  }, [categoryData]);

  return (
    <section>
      <CrudTemplate
        title="Portfolio Management"
        subtitle="Manage your Portfolio here"
        data={portfolios?.data || []}
        columns={portfolioColumns}
        formFields={dynamicFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default PortfolioPage;
