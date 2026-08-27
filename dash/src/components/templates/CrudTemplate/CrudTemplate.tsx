"use client";
import React, { useState } from "react";
import Card from "antd/es/card";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import message from "antd/es/message";
import Space from "antd/es/space";
import Form from "antd/es/form";
import Tag from "antd/es/tag";
import Divider from "antd/es/divider";
import {
  PlusOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AdvancedTable from "../../common/AdvancedTable/AdvancedTable";
import FormBuilder, { FormField } from "../../common/FormBuilder/FormBuilder";
import type { ColumnsType } from "antd/es/table";
import { convertRecordForForm } from "@/utils/formUtils";

interface CrudTemplateProps<T> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: ColumnsType<T>;
  formFields: FormField[];
  loading: boolean;
  onAdd: (data: any) => Promise<void>;
  onEdit: (id: string | number, data: any) => Promise<void>;
  onDelete: (id: string | number) => Promise<void>;
  onToggle?: (id: string | number, status: boolean) => Promise<void>;
  onView?: (record: T) => void;
  extraActions?: React.ReactNode;
  enableSearch?: boolean;
  enableFilters?: boolean;
  rowSelection?: any;
  totalItems?: number;
}

const CrudTemplate = <
  T extends { _id: string | number; id?: string | number }
>({
  title,
  subtitle,
  data,
  columns,
  formFields,
  loading,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
  onView,
  extraActions,
  enableSearch = true,
  enableFilters = true,
  rowSelection,
  totalItems,
}: CrudTemplateProps<T>) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<T | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: T) => {
    setEditingRecord(record);
    setIsModalVisible(true);

    // Convert date fields
    const safeValues = convertRecordForForm(record, formFields);

    form.setFieldsValue(safeValues);
  };

  const handleView = (record: T) => {
    onView?.(record);
  };

  const handleDelete = async (record: T) => {
    Modal.confirm({
      title: (
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500 text-lg" />
          <span className="font-semibold">Confirm Deletion</span>
        </div>
      ),
      content: (
        <p>Are you sure you want to delete this {title.toLowerCase()}?</p>
      ),
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          await onDelete(record._id);
          message.success(`${title} deleted successfully`);
        } catch {
          message.error("Delete failed. Please try again.");
        }
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      message.warning("Please select items to delete");
      return;
    }

    Modal.confirm({
      title: (
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500 text-lg" />
          <span className="font-semibold">Confirm Bulk Deletion</span>
        </div>
      ),
      content: (
        <p>
          Are you sure you want to delete {selectedRows.length} selected{" "}
          {title.toLowerCase()}?
        </p>
      ),
      okText: `Delete ${selectedRows.length} Items`,
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          await Promise.all(selectedRows.map((row) => onDelete(row._id)));
          message.success(`Deleted ${selectedRows.length} items`);
          setSelectedRows([]);
        } catch {
          message.error("Bulk delete failed");
        }
      },
    });
  };

  const handleToggle = async (record: T, checked: boolean) => {
    try {
      await onToggle?.(record.id || record._id, checked);
      message.success("Status updated successfully");
    } catch {
      message.error("Failed to update status");
    }
  };

  const handleFormSubmit = async (values: any) => {
    setSubmitLoading(true);
    try {
      if (editingRecord) {
        await onEdit(editingRecord._id, values);
        message.success(`${title} updated successfully`);
      } else {
        await onAdd(values);
        message.success(`${title} created successfully`);
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch {
      message.error("Operation failed. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const enhancedColumns: ColumnsType<T> = [...columns];

  return (
    <div className="crud-template mt-6 px-4 lg:px-6">
      <Card
        className="rounded-2xl shadow-sm border-0 bg-white hover:shadow-md transition-shadow duration-300"
        title={
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 py-4">
              <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
              {totalItems !== undefined && (
                <Tag className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                  Total: {totalItems}
                </Tag>
              )}
            </div>

            <div className="mt-4 lg:mt-0">
              <Space wrap>
                {selectedRows.length > 0 && (
                  <Button danger onClick={handleBulkDelete}>
                    Delete Selected ({selectedRows.length})
                  </Button>
                )}
                {extraActions}
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                  className="h-10 px-6 font-semibold bg-primary hover:bg-primary/90 border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-white"
                >
                  Add New
                </Button>
              </Space>
            </div>
          </div>
        }
      >
        <AdvancedTable<T>
          data={data}
          columns={enhancedColumns}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={onToggle ? handleToggle : undefined}
          onView={handleView}
          rowSelection={
            rowSelection
              ? {
                  ...rowSelection,
                  onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }
              : undefined
          }
        />

        <Modal
          title={editingRecord ? `Edit ${title}` : `Create New ${title}`}
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
          destroyOnClose
          centered
        >
          <Divider />
          <FormBuilder
            fields={formFields}
            form={form}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
            submitText={
              submitLoading
                ? editingRecord
                  ? "Updating..."
                  : "Creating..."
                : editingRecord
                ? "Update"
                : "Create"
            }
          />
        </Modal>
      </Card>
    </div>
  );
};

export default CrudTemplate;

// "use client";
// import React, { useState } from "react";
// import Card from "antd/es/card";
// import Button from "antd/es/button";
// import Modal from "antd/es/modal";
// import message from "antd/es/message";
// import Space from "antd/es/space";
// import Form from "antd/es/form";
// import Tag from "antd/es/tag";
// import Divider from "antd/es/divider";
// import {
//   PlusOutlined,
//   LoadingOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import AdvancedTable from "../../common/AdvancedTable/AdvancedTable";
// import FormBuilder, { FormField } from "../../common/FormBuilder/FormBuilder";
// import type { ColumnsType } from "antd/es/table";
// import { convertRecordForForm } from "@/utils/formUtils";

// interface CrudTemplateProps<T> {
//   title: string;
//   subtitle?: string;
//   data: T[];
//   columns: ColumnsType<T>;
//   formFields: FormField[];
//   loading: boolean;
//   onAdd: (data: any) => Promise<void>;
//   onEdit: (id: string | number, data: any) => Promise<void>;
//   onDelete: (id: string | number) => Promise<void>;
//   onToggle?: (id: string | number, status: boolean) => Promise<void>;
//   onView?: (record: T) => void;
//   extraActions?: React.ReactNode;
//   enableSearch?: boolean;
//   enableFilters?: boolean;
//   rowSelection?: any;
//   totalItems?: number;
// }

// const CrudTemplate = <
//   T extends { _id: string | number; id?: string | number }
// >({
//   title,
//   subtitle,
//   data,
//   columns,
//   formFields,
//   loading,
//   onAdd,
//   onEdit,
//   onDelete,
//   onToggle,
//   onView,
//   extraActions,
//   enableSearch = true,
//   enableFilters = true,
//   rowSelection,
//   totalItems,
// }: CrudTemplateProps<T>) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingRecord, setEditingRecord] = useState<T | null>(null);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState<T[]>([]);
//   const [form] = Form.useForm();

//   const handleAdd = () => {
//     setEditingRecord(null);
//     setIsModalVisible(true);
//     form.resetFields();
//   };

//   const handleEdit = (record: T) => {
//     setEditingRecord(record);
//     setIsModalVisible(true);

//     // Convert date fields
//     const safeValues = convertRecordForForm(record, formFields);

//     form.setFieldsValue(safeValues);
//   };

//   const handleView = (record: T) => {
//     onView?.(record);
//   };

//   const handleDelete = async (record: T) => {
//     Modal.confirm({
//       title: (
//         <div className="flex items-center gap-2">
//           <ExclamationCircleOutlined className="text-red-500 text-lg" />
//           <span className="font-semibold">Confirm Deletion</span>
//         </div>
//       ),
//       content: (
//         <p>Are you sure you want to delete this {title.toLowerCase()}?</p>
//       ),
//       okText: "Yes, Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       centered: true,
//       onOk: async () => {
//         try {
//           await onDelete(record._id);
//           message.success(`${title} deleted successfully`);
//         } catch {
//           message.error("Delete failed. Please try again.");
//         }
//       },
//     });
//   };

//   const handleBulkDelete = () => {
//     if (selectedRows.length === 0) {
//       message.warning("Please select items to delete");
//       return;
//     }

//     Modal.confirm({
//       title: (
//         <div className="flex items-center gap-2">
//           <ExclamationCircleOutlined className="text-red-500 text-lg" />
//           <span className="font-semibold">Confirm Bulk Deletion</span>
//         </div>
//       ),
//       content: (
//         <p>
//           Are you sure you want to delete {selectedRows.length} selected{" "}
//           {title.toLowerCase()}?
//         </p>
//       ),
//       okText: `Delete ${selectedRows.length} Items`,
//       okType: "danger",
//       cancelText: "Cancel",
//       centered: true,
//       onOk: async () => {
//         try {
//           await Promise.all(selectedRows.map((row) => onDelete(row._id)));
//           message.success(`Deleted ${selectedRows.length} items`);
//           setSelectedRows([]);
//         } catch {
//           message.error("Bulk delete failed");
//         }
//       },
//     });
//   };

//   const handleToggle = async (record: T, checked: boolean) => {
//     try {
//       await onToggle?.(record.id || record._id, checked);
//       message.success("Status updated successfully");
//     } catch {
//       message.error("Failed to update status");
//     }
//   };

//   const handleFormSubmit = async (values: any) => {
//     setSubmitLoading(true);
//     try {
//       if (editingRecord) {
//         await onEdit(editingRecord._id, values);
//         message.success(`${title} updated successfully`);
//       } else {
//         await onAdd(values);
//         message.success(`${title} created successfully`);
//       }
//       setIsModalVisible(false);
//       form.resetFields();
//     } catch {
//       message.error("Operation failed. Please try again.");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     setEditingRecord(null);
//     form.resetFields();
//   };

//   const enhancedColumns: ColumnsType<T> = [...columns];

//   return (
//     <div className="crud-template mt-6 px-4 lg:px-6">
//       <Card
//         className="rounded-2xl shadow-sm border-0 bg-white hover:shadow-md transition-shadow duration-300"
//         title={
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex-1 py-4">
//               <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
//               {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
//               {totalItems !== undefined && (
//                 <Tag className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
//                   Total: {totalItems}
//                 </Tag>
//               )}
//             </div>

//             <div className="mt-4 lg:mt-0">
//               <Space wrap>
//                 {selectedRows.length > 0 && (
//                   <Button danger onClick={handleBulkDelete}>
//                     Delete Selected ({selectedRows.length})
//                   </Button>
//                 )}
//                 {extraActions}
//                 <Button
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   onClick={handleAdd}
//                   className="h-10 px-6 font-semibold bg-primary hover:bg-primary/90 border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-white"
//                 >
//                   Add New
//                 </Button>
//               </Space>
//             </div>
//           </div>
//         }
//       >
//         <AdvancedTable<T>
//           data={data}
//           columns={enhancedColumns}
//           loading={loading}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onToggle={onToggle ? handleToggle : undefined}
//           onView={handleView}
//           rowSelection={
//             rowSelection
//               ? {
//                   ...rowSelection,
//                   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
//                 }
//               : undefined
//           }
//         />

//         <Modal
//           title={editingRecord ? `Edit ${title}` : `Create New ${title}`}
//           open={isModalVisible}
//           onCancel={handleModalClose}
//           footer={null}
//           width={800}
//           destroyOnClose
//           centered
//         >
//           <Divider />
//           <FormBuilder
//             fields={formFields}
//             form={form}
//             onSubmit={handleFormSubmit}
//             onCancel={handleModalClose}
//             submitText={
//               submitLoading
//                 ? editingRecord
//                   ? "Updating..."
//                   : "Creating..."
//                 : editingRecord
//                 ? "Update"
//                 : "Create"
//             }
//           />
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default CrudTemplate;

// "use client";
// import React, { useState } from "react";
// import Card from "antd/es/card";
// import Button from "antd/es/button";
// import Modal from "antd/es/modal";
// import message from "antd/es/message";
// import Space from "antd/es/space";
// import Form from "antd/es/form";
// import Tag from "antd/es/tag";
// import Divider from "antd/es/divider";
// import {
//   PlusOutlined,
//   LoadingOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import AdvancedTable from "../../common/AdvancedTable/AdvancedTable";
// import FormBuilder, { FormField } from "../../common/FormBuilder/FormBuilder";
// import type { ColumnsType } from "antd/es/table";
// import { convertRecordForForm } from "@/utils/formUtils";

// interface CrudTemplateProps<T> {
//   title: string;
//   subtitle?: string;
//   data: T[];
//   columns: ColumnsType<T>;
//   formFields: FormField[];
//   loading: boolean;
//   onAdd: (data: any) => Promise<void>;
//   onEdit: (id: string | number, data: any) => Promise<void>;
//   onDelete: (id: string | number) => Promise<void>;
//   onToggle?: (id: string | number, status: boolean) => Promise<void>;
//   onView?: (record: T) => void;
//   extraActions?: React.ReactNode;
//   enableSearch?: boolean;
//   enableFilters?: boolean;
//   rowSelection?: any;
//   totalItems?: number;
// }

// const CrudTemplate = <
//   T extends { _id: string | number; id?: string | number }
// >({
//   title,
//   subtitle,
//   data,
//   columns,
//   formFields,
//   loading,
//   onAdd,
//   onEdit,
//   onDelete,
//   onToggle,
//   onView,
//   extraActions,
//   enableSearch = true,
//   enableFilters = true,
//   rowSelection,
//   totalItems,
// }: CrudTemplateProps<T>) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingRecord, setEditingRecord] = useState<T | null>(null);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState<T[]>([]);
//   const [form] = Form.useForm();

//   const handleAdd = () => {
//     setEditingRecord(null);
//     setIsModalVisible(true);
//     form.resetFields();
//   };

//   const handleEdit = (record: T) => {
//     setEditingRecord(record);
//     setIsModalVisible(true);

//     // Convert date fields
//     const safeValues = convertRecordForForm(record, formFields);

//     form.setFieldsValue(safeValues);
//   };

//   const handleView = (record: T) => {
//     onView?.(record);
//   };

//   const handleDelete = async (record: T) => {
//     Modal.confirm({
//       title: (
//         <div className="flex items-center gap-2">
//           <ExclamationCircleOutlined className="text-red-500 text-lg" />
//           <span className="font-semibold">Confirm Deletion</span>
//         </div>
//       ),
//       content: (
//         <p>Are you sure you want to delete this {title.toLowerCase()}?</p>
//       ),
//       okText: "Yes, Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       centered: true,
//       onOk: async () => {
//         try {
//           await onDelete(record._id);
//           message.success(`${title} deleted successfully`);
//         } catch {
//           message.error("Delete failed. Please try again.");
//         }
//       },
//     });
//   };

//   const handleBulkDelete = () => {
//     if (selectedRows.length === 0) {
//       message.warning("Please select items to delete");
//       return;
//     }

//     Modal.confirm({
//       title: (
//         <div className="flex items-center gap-2">
//           <ExclamationCircleOutlined className="text-red-500 text-lg" />
//           <span className="font-semibold">Confirm Bulk Deletion</span>
//         </div>
//       ),
//       content: (
//         <p>
//           Are you sure you want to delete {selectedRows.length} selected{" "}
//           {title.toLowerCase()}?
//         </p>
//       ),
//       okText: `Delete ${selectedRows.length} Items`,
//       okType: "danger",
//       cancelText: "Cancel",
//       centered: true,
//       onOk: async () => {
//         try {
//           await Promise.all(selectedRows.map((row) => onDelete(row._id)));
//           message.success(`Deleted ${selectedRows.length} items`);
//           setSelectedRows([]);
//         } catch {
//           message.error("Bulk delete failed");
//         }
//       },
//     });
//   };

//   const handleToggle = async (record: T, checked: boolean) => {
//     try {
//       await onToggle?.(record.id || record._id, checked);
//       message.success("Status updated successfully");
//     } catch {
//       message.error("Failed to update status");
//     }
//   };

//   const handleFormSubmit = async (values: any) => {
//     setSubmitLoading(true);
//     try {
//       if (editingRecord) {
//         await onEdit(editingRecord._id, values);
//         message.success(`${title} updated successfully`);
//       } else {
//         await onAdd(values);
//         message.success(`${title} created successfully`);
//       }
//       setIsModalVisible(false);
//       form.resetFields();
//     } catch {
//       message.error("Operation failed. Please try again.");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     setEditingRecord(null);
//     form.resetFields();
//   };

//   const enhancedColumns: ColumnsType<T> = [...columns];

//   return (
//     <div className="crud-template mt-6 px-4 lg:px-6">
//       <Card
//         className="rounded-2xl shadow-sm border-0 bg-white hover:shadow-md transition-shadow duration-300"
//         title={
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex-1 py-4">
//               <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
//               {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
//               {totalItems !== undefined && (
//                 <Tag className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
//                   Total: {totalItems}
//                 </Tag>
//               )}
//             </div>

//             <div className="mt-4 lg:mt-0">
//               <Space wrap>
//                 {selectedRows.length > 0 && (
//                   <Button danger onClick={handleBulkDelete}>
//                     Delete Selected ({selectedRows.length})
//                   </Button>
//                 )}
//                 {extraActions}
//                 <Button
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   onClick={handleAdd}
//                   className="h-10 px-6 font-semibold bg-primary hover:bg-primary/90 border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-white"
//                 >
//                   Add New
//                 </Button>
//               </Space>
//             </div>
//           </div>
//         }
//       >
//         <AdvancedTable<T>
//           data={data}
//           columns={enhancedColumns}
//           loading={loading}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onToggle={onToggle ? handleToggle : undefined}
//           onView={handleView}
//           rowSelection={
//             rowSelection
//               ? {
//                   ...rowSelection,
//                   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
//                 }
//               : undefined
//           }
//         />

//         <Modal
//           title={editingRecord ? `Edit ${title}` : `Create New ${title}`}
//           open={isModalVisible}
//           onCancel={handleModalClose}
//           footer={null}
//           width={800}
//           destroyOnClose
//           centered
//         >
//           <Divider />
//           <FormBuilder
//             fields={formFields}
//             form={form}
//             onSubmit={handleFormSubmit}
//             onCancel={handleModalClose}
//             submitText={
//               submitLoading
//                 ? editingRecord
//                   ? "Updating..."
//                   : "Creating..."
//                 : editingRecord
//                 ? "Update"
//                 : "Create"
//             }
//           />
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default CrudTemplate;
