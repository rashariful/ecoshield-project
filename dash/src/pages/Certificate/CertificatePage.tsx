import React from "react";
import { message } from "antd";
import CrudTemplate from "@/components/templates/CrudTemplate/CrudTemplate";
import { certificateColumns } from "@/utils/tableConfigs";
import { certificateFormFields } from "@/utils/formSchemas";

import {
  useGetAllCertificateQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} from "@/redux/api/certificateApi";

type CertificateFormData = {
  title: string;
  thumbnail?: File;
  isActive?: boolean;
};

const CertificatePage: React.FC = () => {
  const {
    data: certificates,
    isLoading,
    refetch,
  } = useGetAllCertificateQuery();

  const [createCertificate] = useCreateCertificateMutation();
  const [updateCertificate] = useUpdateCertificateMutation();
  const [deleteCertificate] = useDeleteCertificateMutation();

  // Convert form data to FormData (same helper as Banner)
  const convertToFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!value && value !== 0) return;

      if (value?.originFileObj instanceof File) {
        formData.append(key, value.originFileObj);
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, String(v)));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    return formData;
  };

  // Add
  const handleAdd = async (data: CertificateFormData) => {
    try {
      const formData = convertToFormData(data);
      await createCertificate(formData).unwrap();
      message.success("Certificate added successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to add certificate");
    }
  };

  // Edit
  const handleEdit = async (id: string, data: CertificateFormData) => {
    try {
      const formData = convertToFormData(data);
      await updateCertificate({ id, data: formData }).unwrap();
      message.success("Certificate updated successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update certificate");
    }
  };

  // Delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteCertificate(id).unwrap();
      message.success("Certificate deleted successfully");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete certificate");
    }
  };

  // Toggle active/inactive
  const handleToggle = async (id: string, checked: boolean) => {
    try {
      await updateCertificate({
        id,
        data: { isActive: checked },
      }).unwrap();

      message.success(
        `Certificate ${checked ? "activated" : "deactivated"} successfully`
      );
      refetch();
    } catch {
      message.error("Failed to update certificate status");
    }
  };

  return (
    <section>
      <CrudTemplate
        title="Certificate Management"
        subtitle="Manage all certificates from here"
        data={Array.isArray(certificates?.data) ? certificates.data : []}
        columns={certificateColumns}
        formFields={certificateFormFields}
        loading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </section>
  );
};

export default CertificatePage;
