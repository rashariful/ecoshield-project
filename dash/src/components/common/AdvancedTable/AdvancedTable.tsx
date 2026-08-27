// components/common/AdvancedTable/AdvancedTable.tsx
"use client";

import { Table, Button, Space, Tag, Switch, Tooltip, Input } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState, useEffect } from "react";

interface AdvancedTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onView?: (record: T) => void;
  onToggle?: (record: T, checked: boolean) => void;
  rowSelection?: TableProps<T>["rowSelection"];
  pagination?: any;
  scroll?: { x?: number; y?: number };
  searchable?: boolean;
  onSearch?: (value: string) => void;
  searchDebounce?: number;
}

const AdvancedTable = <
  T extends { id?: string | number; _id?: string | number; isActive?: boolean }
>({
  data,
  columns,
  loading = false,
  onEdit,
  onDelete,
  onView,
  onToggle,
  rowSelection,
  pagination = { pageSize: 10 },
  scroll = { x: 1000 },
  searchable = true,
  onSearch,
  searchDebounce = 300,
}: AdvancedTableProps<T>) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!onSearch) return;
    const handler = setTimeout(() => {
      onSearch(searchValue);
    }, searchDebounce);

    return () => clearTimeout(handler);
  }, [searchValue, onSearch, searchDebounce]);

  const actionColumn: ColumnsType<T>[0] = {
    title: "Actions",
    key: "actions",
    fixed: "right",
    width: 150,
    render: (_, record) => (
      <Space size="small">
        {onToggle && (
          <Tooltip title="Toggle Status">
            <Switch
              size="small"
              checked={record.isActive ?? false}
              onChange={(checked) => onToggle(record, checked)}
            />
          </Tooltip>
        )}

        {onView && (
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
        )}

        {onEdit && (
          <Tooltip title="Edit">
            <Button
              size="small"
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="text-primary hover:text-primary/80 hover:bg-primary/10 border border-primary/20 hover:scale-110 transition-all duration-200"
            />
          </Tooltip>
        )}

        {onDelete && (
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              danger
              icon={<RiDeleteBin6Line className="text-white" />}
              onClick={() => onDelete(record)}
              className="bg-white hover:text-red-700 hover:bg-red-600 border border-red-200 hover:scale-110 transition-all duration-200"
            />
          </Tooltip>
        )}
      </Space>
    ),
  };

  const tableColumns = [...columns, actionColumn];

  return (
    <div className="advanced-table">
      {searchable && onSearch && (
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
      )}

      <Table<T>
        columns={tableColumns}
        dataSource={data}
        loading={loading}
        rowSelection={
          rowSelection
            ? {
                ...rowSelection,
                onChange: (_, selectedRows) =>
                  rowSelection.onChange?.(_, selectedRows),
              }
            : undefined
        }
        pagination={pagination}
        scroll={scroll}
        rowKey={(record) => record.id || record._id || Math.random()} // fallback if neither exists
        size="middle"
      />
    </div>
  );
};

export default AdvancedTable;

// // components/common/AdvancedTable/AdvancedTable.tsx
// "use client";

// import { Table, Button, Space, Tag, Switch, Tooltip, Input } from "antd";
// import { EditOutlined, EyeOutlined } from "@ant-design/icons";
// // import { RiDeleteBin6Line } from "react-icons/ri";
// import type { ColumnsType, TableProps } from "antd/es/table";
// import { useState, useEffect } from "react";
// import { Delete } from "lucide-react";

// interface AdvancedTableProps<T> {
//   data: T[];
//   columns: ColumnsType<T>;
//   loading?: boolean;
//   onEdit?: (record: T) => void;
//   onDelete?: (record: T) => void;
//   onView?: (record: T) => void;
//   onToggle?: (record: T, checked: boolean) => void;
//   rowSelection?: TableProps<T>["rowSelection"];
//   pagination?: any;
//   scroll?: { x?: number; y?: number };
//   searchable?: boolean;
//   onSearch?: (value: string) => void;
//   searchDebounce?: number;
// }

// const AdvancedTable = <
//   T extends { id?: string | number; _id?: string | number; isActive?: boolean }
// >({
//   data,
//   columns,
//   loading = false,
//   onEdit,
//   onDelete,
//   onView,
//   onToggle,
//   rowSelection,
//   pagination = { pageSize: 10 },
//   scroll = { x: 1000 },
//   searchable = true,
//   onSearch,
//   searchDebounce = 300,
// }: AdvancedTableProps<T>) => {
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     if (!onSearch) return;
//     const handler = setTimeout(() => {
//       onSearch(searchValue);
//     }, searchDebounce);

//     return () => clearTimeout(handler);
//   }, [searchValue, onSearch, searchDebounce]);

//   const actionColumn: ColumnsType<T>[0] = {
//     title: "Actions",
//     key: "actions",
//     fixed: "right",
//     width: 150,
//     render: (_, record) => (
//       <Space size="small">
//         {onToggle && (
//           <Tooltip title="Toggle Status">
//             <Switch
//               size="small"
//               checked={record.isActive ?? false}
//               onChange={(checked) => onToggle(record, checked)}
//             />
//           </Tooltip>
//         )}

//         {onView && (
//           <Tooltip title="View">
//             <Button
//               type="text"
//               icon={<EyeOutlined />}
//               onClick={() => onView(record)}
//             />
//           </Tooltip>
//         )}

//         {onEdit && (
//           <Tooltip title="Edit">
//             <Button
//               size="small"
//               type="text"
//               icon={<EditOutlined />}
//               onClick={() => onEdit(record)}
//               className="text-primary hover:text-primary/80 hover:bg-primary/10 border border-primary/20 hover:scale-110 transition-all duration-200"
//             />
//           </Tooltip>
//         )}

//         {onDelete && (
//           <Tooltip title="Delete">
//             <Button
//               type="text"
//               size="small"
//               danger
//               icon={<Delete className="text-white" />}
//               onClick={() => onDelete(record)}
//               className="bg-white hover:text-red-700 hover:bg-red-600 border border-red-200 hover:scale-110 transition-all duration-200"
//             />
//           </Tooltip>
//         )}
//       </Space>
//     ),
//   };

//   const tableColumns = [...columns, actionColumn];

//   return (
//     <div className="advanced-table">
//       {searchable && onSearch && (
//         <Input
//           placeholder="Search..."
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           style={{ marginBottom: 16, width: 300 }}
//         />
//       )}

//       <Table<T>
//         columns={tableColumns}
//         dataSource={data}
//         loading={loading}
//         rowSelection={
//           rowSelection
//             ? {
//                 ...rowSelection,
//                 onChange: (_, selectedRows) =>
//                   rowSelection.onChange?.(_, selectedRows),
//               }
//             : undefined
//         }
//         pagination={pagination}
//         scroll={scroll}
//         rowKey={(record) => record.id || record._id || Math.random()} // fallback if neither exists
//         size="middle"
//       />
//     </div>
//   );
// };

// export default AdvancedTable;

