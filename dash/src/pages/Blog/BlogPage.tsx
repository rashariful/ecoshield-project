"use client";

import React, { useMemo } from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { blogColumns } from "@/utils/tableConfigs";
import { blogFormFields } from "@/utils/formSchemas";

import {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/redux/api/blogApi";

import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";

type BlogFormData = {
  title: string;
  slug: string;
  description?: string;
  shortDescrip?: string;
  thumbnail?: File;
  category: string;
  tags?: string[];
  publishedAt?: Date;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  isActive?: boolean;
};

const BlogPage: React.FC = () => {
  // Categories
  const { data: categoryData } = useGetAllCategoryQuery();

  // Blogs
  const { data: blogs, isLoading, refetch } = useGetAllBlogQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  // Convert object → FormData
  const convertToFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value?.originFileObj instanceof File) {
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

  // ----- Add Blog -----
  const handleAdd = async (data: BlogFormData) => {
    try {
      const formData = convertToFormData(data);
      await createBlog(formData).unwrap();
      message.success("Blog created successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to create blog");
    }
  };

  // ----- Edit Blog -----
  const handleEdit = async (id: string, data: BlogFormData) => {
    try {
      const formData = convertToFormData(data);
      await updateBlog({ id, data: formData }).unwrap();
      message.success("Blog updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update blog");
    }
  };

  // ----- Delete Blog -----
  const handleDelete = async (id: string | number) => {
    try {
      await deleteBlog(id).unwrap();
      message.success("Blog deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete blog");
    }
  };

  // ----- Dynamic Category Options -----
  const dynamicFormFields = useMemo(() => {
    const categoryOptions =
      categoryData?.data?.map((c: any) => ({
        label: c.name,
        value: c._id,
      })) || [];

    return blogFormFields.map((field) => {
      if (field.name === "category") {
        return {
          ...field,
          options: categoryOptions,
          dynamicOptions: true,
        };
      }
      return field;
    });
  }, [categoryData]);

  return (
    <section>
      <CrudTemplate
        title="Blog Management"
        subtitle="Create, update & manage blogs"
        data={blogs?.data || []}
        columns={blogColumns}
        formFields={dynamicFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default BlogPage;
