// utils/tableConfigs.tsx
import { ColumnsType } from "antd/es/table";
import { Button, Image, Tag, Tooltip } from "antd";

export const bannerColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image width={50} height={50} src={thumbnail} alt="Banner" />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Sub Title",
    dataIndex: "subTitle",
    key: "subTitle",
  },
  {
    title: "Keywords",
    dataIndex: "keywords",
    key: "keywords",
    render: (keywords: string[]) =>
      Array.isArray(keywords) ? keywords.join(", ") : "",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];


export const blogColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 100,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image width={50} height={50} src={thumbnail} alt="Blog" />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text: string) => (
      <Tooltip title={text}>
        <span className="font-medium line-clamp-1">{text}</span>
      </Tooltip>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },

  // 🔹 SEO META TITLE
  {
    title: "Meta Title",
    dataIndex: ["seo", "metaTitle"],
    key: "metaTitle",
    render: (text: string) => (
      <Tooltip title={text}>
        <span className="line-clamp-1">{text || "-"}</span>
      </Tooltip>
    ),
  },

  // 🔹 SEO META DESCRIPTION
  {
    title: "Meta Description",
    dataIndex: ["seo", "metaDescription"],
    key: "metaDescription",
    render: (text: string) => (
      <Tooltip title={text}>
        <span className="line-clamp-2">{text || "-"}</span>
      </Tooltip>
    ),
  },

  // 🔹 SEO KEYWORDS
  {
    title: "Keywords",
    dataIndex: ["seo", "keywords"],
    key: "keywords",
    render: (keywords: string[]) =>
      keywords?.length
        ? keywords.map((k) => (
            <Tag key={k} color="purple">
              {k}
            </Tag>
          ))
        : "-",
  },

  {
    title: "Short Description",
    dataIndex: "shortDescrip",
    key: "shortDescrip",
    render: (text: string) => (
      <Tooltip title={text}>
        <span className="line-clamp-2">{text || "-"}</span>
      </Tooltip>
    ),
  },

  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: string[]) =>
      tags?.length
        ? tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))
        : "-",
  },

 
];

// export const blogColumns: ColumnsType<any> = [

//   {
//     title: "SL",
//     key: "index",
//     width: 60,
//     align: "center",
//     render: (_, __, index) => index + 1,
//   },
//   {
//     title: "Thumbnail",
//     dataIndex: "thumbnail",
//     key: "thumbnail",
//     render: (thumbnail: string) =>
//       thumbnail ? (
//         <Image width={50} height={50} src={thumbnail} alt="Banner" />
//       ) : (
//         "No Image"
//       ),
//   },
//     {
//     title: "Title",
//     dataIndex: "title",
//     key: "title",
//     render: (text) => (
//       <Tooltip title={text}>
//         <span className="font-medium line-clamp-1">{text}</span>
//       </Tooltip>
//     ),
//   },
//   {
//     title: "Category",
//     dataIndex: "category",
//     key: "category",
//   },
//   {
//     title: "Tags",
//     dataIndex: "tags",
//     key: "tags",
//     render: (tags: string[]) =>
//       tags?.length
//         ? tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
//         : "-",
//   },
 
// ];

export const teamColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 80,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt="Profile"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          No Image
        </div>
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Joined Date",
    dataIndex: "joinedAt",
    key: "joinedAt",
    render: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "N/A",
    sorter: (a, b) =>
      new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];
export const partnerColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 80,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt="Profile"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          No Image
        </div>
      ),
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    sorter: false,
  },

  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];
export const serviceColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (url: string) =>
      url ? (
        <img
          src={url}
          alt="thumbnail"
          style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 4 }}
        />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
  },

  {
    title: "Short Description",
    dataIndex: "shortDescription",
    key: "shortDescription",
    render: (text: string) =>
      text?.length > 50 ? text.slice(0, 50) + "..." : text,
  },

  {
    title: "Video URL",
    dataIndex: "videoUrl",
    key: "videoUrl",
    render: (text: string) =>
      text ? (
        <a href={text} target="_blank" rel="noreferrer">
          View
        </a>
      ) : (
        "N/A"
      ),
  },

  // {
  //   title: "FAQs",
  //   dataIndex: "faqs",
  //   key: "faqs",
  //   render: (faqs: { question: string; answer: string }[]) =>
  //     faqs?.length
  //       ? faqs.map((f, i) => (
  //           <div key={i}>
  //             <strong>Q:</strong> {f.question} <br />
  //             <strong>A:</strong> {f.answer}
  //           </div>
  //         ))
  //       : "No FAQs",
  // },

  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    render: (value: boolean) => (value ? "Active" : "Inactive"),
  },
];

export const certificateColumns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (src: string) =>
      src ? <Image src={src} width={60} /> : "—",
  },

  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category: string) =>
      category ? <Tag color="blue">{category}</Tag> : "—",
  },

  {
    title: "Issued By",
    dataIndex: "issuedBy",
    key: "issuedBy",
  },

  {
    title: "Issued Date",
    dataIndex: "issuedDate",
    key: "issuedDate",
    render: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "—",
  },

  {
    title: "Valid Info",
    dataIndex: "validInfo",
    key: "validInfo",
    
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status.toUpperCase()}
      </Tag>
    ),
  },

];


export const serviceAreaColumns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
  },
];

export const testimonialColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    width: 80,
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image
          width={50}
          height={50}
          src={thumbnail}
          alt="Profile"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          No Image
        </div>
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: false,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: false,
  },
  {
    title: "Review",
    dataIndex: "review",
    key: "review",
    render: (text: string) =>
      text?.length > 60 ? `${text.slice(0, 60)}...` : text || "—",
  },
  {
    title: "Video URL",
    dataIndex: "videoUrl",
    key: "videoUrl",
    render: (url: string) =>
      url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      ) : (
        "—"
      ),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
];
export const portfolioColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) =>
      images?.length
        ? images.map((img, idx) => (
            <Image
              key={idx}
              width={50}
              height={50}
              src={img}
              alt={`Portfolio ${idx + 1}`}
              style={{ marginRight: 5, objectFit: "cover" }}
            />
          ))
        : "No Images",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Sub Title",
    dataIndex: "subTitle",
    key: "subTitle",
  },
  {
    title: "Category",
    dataIndex: ["category", "name"], // assuming category is populated
    key: "category",
    render: (name: string) => name || "N/A",
  },
  {
    title: "Materials Used",
    dataIndex: "materialsUsed",
    key: "materialsUsed",
    render: (materials: string[]) =>
      materials?.length
        ? materials.map((mat, idx) => (
            <Tag key={idx} color="blue" style={{ marginBottom: 4 }}>
              {mat}
            </Tag>
          ))
        : "N/A",
  },
  {
    title: "Project Status",
    dataIndex: "projectStatus",
    key: "projectStatus",
    render: (status: string) => {
      let color = "default";
      if (status === "Completed") color = "green";
      else if (status === "Ongoing") color = "orange";
      else if (status === "Upcoming") color = "blue";
      return <Tag color={color}>{status}</Tag>;
    },
  },
];



export const galleriesColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) =>
      images?.length ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {images.slice(0, 3).map((img, idx) => (
            <Image
              key={idx}
              width={50}
              height={50}
              src={img}
              alt={`Gallery ${idx + 1}`}
              style={{ objectFit: "cover", borderRadius: 6 }}
              preview={{
                src: img,
              }}
            />
          ))}

          {images.length > 3 && (
            <span style={{ fontSize: 12, color: "#888" }}>
              +{images.length - 3} more
            </span>
          )}
        </div>
      ) : (
        "No Images"
      ),
  },
  {
    title: "Video",
    dataIndex: "videoUrl",
    key: "videoUrl",
    render: (videoUrl: string) =>
      videoUrl ? (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <Button size="small">View Video</Button>
        </a>
      ) : (
        "No Video"
      ),
  },
];

import dayjs from "dayjs";

export const contactColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Preferred Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
    render: (value: string) =>
      value ? dayjs(value).format("DD MMM YYYY, hh:mm A") : "-",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    ellipsis: true,
  },
];
export const quoteColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Budget",
    dataIndex: "budget",
    key: "budget",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
];
export const faqColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Question",
    dataIndex: "question",
    key: "question",
  },
  {
    title: "Answer",
    dataIndex: "answer",
    key: "answer",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    align: "center",
    render: (value: boolean) => (value ? "Active" : "Inactive"),
  },
];
export const directorColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (thumbnail: string) =>
      thumbnail ? (
        <Image width={50} height={50} src={thumbnail} alt="Director" />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Specialties",
    dataIndex: "specialties",
    key: "specialties",
    render: (specialties: { specialty: string }[]) =>
      specialties?.length
        ? specialties.map((item, i) => (
            <Tag key={i} color="blue">
              {item.specialty}
            </Tag>
          ))
        : "—",
  },
  {
    title: "Social Links",
    dataIndex: "social",
    key: "social",
    render: (social: { platform: string; link: string; _id?: string }[]) =>
      Array.isArray(social) && social.length > 0 ? (
        <div className="space-y-1">
          {social.map((item) => (
            <div key={item._id || item.platform}>
              <strong>{item.platform}:</strong>{" "}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            </div>
          ))}
        </div>
      ) : (
        "—"
      ),
  },
];
export const overviewColumns: ColumnsType<any> = [
  {
    title: "SL",
    key: "index",
    width: 60,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Page",
    dataIndex: "page",
    key: "page",
    render: (page: string) => <Tag color="blue">{page.toUpperCase()}</Tag>,
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
    render: (items: { title: string; value: string; icon?: string }[]) => (
      <ul style={{ paddingLeft: 16, margin: 0 }}>
        {items?.map((item, index) => (
          <li
            key={index}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {item.icon && (
              <img
                src={item.icon} // icon URL or path
                alt={item.title}
                style={{ width: 16, height: 16 }}
              />
            )}
            <strong>{item.title}:</strong> {item.value}
          </li>
        ))}
      </ul>
    ),
  },
];
export const categoryColumns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleString(),
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (date: string) => new Date(date).toLocaleString(),
    sorter: (a, b) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
  },
];
