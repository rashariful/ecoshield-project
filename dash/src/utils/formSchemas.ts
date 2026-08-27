import { RichTextEditor } from '@/components/common/RichTextEditor/RichTextEditor';
// utils/formSchemas.ts
import { FormField } from "../components/common/FormBuilder/FormBuilder";

export const bannerFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter banner title",
    span: 12,
    required: true,
  },
  {
    name: "subTitle",
    label: "Sub Title",
    type: "text",
    placeholder: "Enter banner sub title",
    span: 12,
    required: true,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    span: 24,
    required: true,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    name: "keywords",
    label: "Keywords",
    type: "dynamicList",
    required: true,
    fields: [
      {
        name: "keyword",
        label: "Keyword",
        type: "text",
        placeholder: "Enter keyword",
        required: true,
      },
    ],
  },
  // {
  //   name: "isActive",
  //   label: "Active Status",
  //   type: "switch",
  //   span: 12,
  //   initialValue: true,
  // },
];


export const blogFormFields = [
  {
    name: "title",
    label: "Blog Title",
    type: "text",
    placeholder: "Enter blog title",
    rules: [{ required: true, message: "Title is required" }],
       span: 12,
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Select category",
    rules: [{ required: true, message: "Category is required" }],
       span: 12,
  },
  {
    name: "shortDescrip",
    label: "Short Description",
    type: "textarea",
    placeholder: "Max 300 characters",
    maxLength: 300,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Long Description",
    type: "richtext", // rich text editor হলে
  },

  {
    name: "tags",
    label: "Tags",
    type: "tags",
    placeholder: "Press enter to add tag",
       span: 12,
  },
{
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    span: 12,
    required: true,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    name: "seo.metaTitle",
    label: "SEO Meta Title",
    type: "text",
    placeholder: "Keep the meta title between 50–60 characters",
  },
  {
    name: "seo.metaDescription",
    label: "SEO Meta Description",
    type: "textarea",
    placeholder: "Aim for about 150-160 characters to ensure the entire description is visible on most devices and not truncated by Google.",
  },
  {
    name: "seo.keywords",
    label: "SEO Keywords",
    type: "tags",
    placeholder: "keyword1, keyword2",
  },
  
];

export const teamFormFields: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter team member name",
    span: 12,
  },
  {
    name: "designation",
    label: "Position",
    type: "text",
    required: true,
    placeholder: "Enter position",
    span: 12,
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write a short biography or mission statement",
    span: 24,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter email address",
    span: 12,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
  },
  {
    name: "thumbnail",
    label: "Profile Image",
    type: "upload",
    required: false,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
];
export const partnerFormFields: FormField[] = [
  {
    name: "title",
    label: "title",
    type: "text",
    placeholder: "Enter title",
    span: 12,
  },
  {
    name: "thumbnail",
    label: "Company logo",
    type: "upload",
    required: false,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
];
export const serviceFormFields: FormField[] = [
  {
    name: "title",
    label: "Service Title",
    type: "text",
    placeholder: "Enter service title",
    span: 12,
    required: true,
  },
  {
    name: "subTitle",
    label: "Sub Title",
    type: "text",
    placeholder: "Enter sub title",
    span: 12,
    required: false,
  },
 
  {
    name: "shortDescription",
    label: "Short Description",
    type: "textarea",
    placeholder: "Enter Short description Max 300  characters",
    span: 24,
  },
  {
    name: "longDescription",
    label: "Long Description",
    type: "richtext",
    placeholder: "Enter long description",
    span: 24,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    span: 12,
    multiple: false,
  },
  {
    name: "videoUrl",
    label: "Video URL",
    type: "text",
    placeholder: "Enter video URL",
    span: 12,
  },
  {
    name: "parentService",
    label: "Parent Service",
    type: "select",
    options: [], // will be populated dynamically in component
    span: 12,
    dynamicOptions: true, // flag to indicate options come from API
  },
  // Uncomment if you want FAQs
  {
    name: "faqs",
    label: "FAQs",
    type: "dynamicList",
    span: 24,
    fields: [
      {
        name: "question",
        label: "Question",
        type: "text",
        placeholder: "Enter question",
        required: true,
      },
      {
        name: "answer",
        label: "Answer",
        type: "textarea",
        placeholder: "Enter answer",
        required: true,
      },
    ],
  },
];
export const testimonialFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter client name",
    span: 12,
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "Enter client designation (optional)",
    span: 12,
  },
  {
    name: "review",
    label: "Review",
    type: "textarea",
    placeholder: "Write testimonial review",
    span: 24,
  },
  {
    name: "videoUrl",
    label: "Video URL",
    type: "text",
    placeholder: "Enter video URL (optional)",
    span: 24,
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    required: false,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
];


export const serviceAreaFormFields: FormField[] = [
  {
    name: "name",
    label: "Service Area Name",
    type: "text",
    placeholder: "Enter service area name",
    span: 12,
    required: true,
  },
  {
    name: "priority",
    label: "Priority",
    type: "number",
    placeholder: "Set priority (0 = normal)",
    span: 12,
  },
 
];

export const certificateFormFields: FormField[] = [
  {
    name: "name",
    label: "Certificate Name",
    type: "text",
    placeholder: "Enter certificate name",
    span: 12,
    required: true,
  },

  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "e.g. Web Development, AI, Security",
    span: 12,
  },

  {
    name: "issuedBy",
    label: "Issued By",
    type: "text",
    placeholder: "e.g. Google, Coursera, Udemy",
    span: 12,
  },

  {
    name: "issuedDate",
    label: "Issued Date",
    type: "date",
    span: 12,
  },
  {
    name: "validInfo",
    label: "valid Info",
    type: "text",
    placeholder: "add info about validaty",
     span: 12,
  },
 

  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Write certificate description (optional)",
    span: 24,
  },

  {
    name: "thumbnail",
    label: "Certificate Thumbnail",
    type: "upload",
    required: true,
    span: 24,
    rules: [
      {
        validator: (_, value) => {
          if (value && value.size > 2 * 1024 * 1024) {
            return Promise.reject(
              new Error("Image size must be less than 2MB!")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },


];

export const portfolioFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter portfolio title",
    span: 12,
    required: true,
  },
  {
    name: "subTitle",
    label: "Sub Title",
    type: "text",
    placeholder: "Enter portfolio subtitle",
    span: 12,
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    span: 12,
    required: true,
    options: [], // will be populated dynamically in component

    dynamicOptions: true,
    // optionsEndpoint: "/category", // 🔗 dynamically fetch from Category collection
    // optionLabel: "name",
    // optionValue: "_id",
  },

  {
    name: "projectStatus",
    label: "Project Status",
    type: "select",
    placeholder: "Select project status",
    span: 12,
    options: [
      { label: "Ongoing", value: "Ongoing" },
      { label: "Completed", value: "Completed" },
      { label: "Upcoming", value: "Upcoming" },
    ],
    required: false,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Write project description",
    span: 24,
    required: true,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter project location",
    span: 12,
  },
  {
    name: "clientName",
    label: "Client Name",
    type: "text",
    placeholder: "Enter client name",
    span: 12,
  },
  {
    name: "images",
    label: "Images",
    type: "upload",
    required: true,
    span: 24,
    multiple: true,
    rules: [
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const files = Array.isArray(value) ? value : [value];
          const tooBig = files.some(
            (file: File) => file.size > 2 * 1024 * 1024
          );
          if (tooBig) {
            return Promise.reject(
              new Error("Each image must be less than 2MB!")
            );
          }

          return Promise.resolve();
        },
      },
    ],
  },
];
export const galleriesFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter gallery title",
    span: 12,
    required: true,
  },
  {
    name: "videoUrl",
    label: "Video URL",
    type: "text",
    placeholder: "Enter video URL (optional)",
    span: 12,
    required: false,
  },
  {
    name: "images",
    label: "Images",
    type: "upload",
    span: 24,
    required: false,
    multiple: true,
    rules: [
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const files = Array.isArray(value) ? value : [value];

          const tooBig = files.some((file: any) => {
            const size = file?.originFileObj?.size || file?.size;
            return size > 2 * 1024 * 1024;
          });

          if (tooBig) {
            return Promise.reject(
              new Error("Each image must be less than 2MB!")
            );
          }

          return Promise.resolve();
        },
      },
    ],
  },
];
export const contactFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    span: 12,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    span: 12,
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
  },
  {
    name: "subject",
    label: "Subject",
    type: "select",
    placeholder: "Select subject",
    span: 12,
    required: true,
    options: [
      { label: "Website Design", value: "website_design" },
      { label: "Digital Marketing", value: "digital_marketing" },
      { label: "App Development", value: "app_development" },
      { label: "UI/UX Design", value: "ui_ux_design" },
      { label: "SEO Optimization", value: "seo_optimization" },
      { label: "Custom Software", value: "custom_software" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter message",
    span: 24,
    required: true,
  },
];
export const quoteFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    span: 12,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    span: 12,
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    span: 12,
  },
  {
    name: "service",
    label: "Service Type",
    type: "select",
    placeholder: "Select service type",
    span: 12,
    required: true,
    options: [
      { label: "Residential Design", value: "residential_design" },
      { label: "Commercial Design", value: "commercial_design" },
      { label: "Office Interior", value: "office_interior" },
      { label: "Kitchen Design", value: "kitchen_design" },
      { label: "Bedroom Design", value: "bedroom_design" },
      { label: "Living Room Design", value: "living_room_design" },
      { label: "Space Planning", value: "space_planning" },
      { label: "Renovation", value: "renovation" },
      { label: "3D Visualization", value: "3d_visualization" },
      { label: "Other", value: "other" },
    ],
  },

  {
    name: "budget",
    label: "Estimated Budget",
    type: "text",
    placeholder: "Enter budget amount or range",
    span: 12,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter additional details or requirements",
    span: 24,
  },
];
export const faqFormFields: FormField[] = [
  {
    name: "question",
    label: "Question",
    type: "text",
    placeholder: "Enter question",
    span: 24,
    required: true,
  },
  {
    name: "answer",
    label: "Answer",
    type: "textarea",
    placeholder: "Enter answer",
    span: 24,
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    span: 12,
    options: [
      { label: "General", value: "General" },
      { label: "Service", value: "Service" },
      { label: "Pricing", value: "Pricing" },
      { label: "Support", value: "Support" },
      { label: "Policy", value: "Policy" },
    ],
  },
  // {
  //   name: "order",
  //   label: "Order",
  //   type: "number",
  //   placeholder: "Enter display order (e.g. 1, 2, 3)",
  //   span: 12,
  // },
  // {
  //   name: "isActive",
  //   label: "Active Status",
  //   type: "switch",
  //   span: 12,
  //   required: false,
  // },
];
export const directorFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter director name",
    span: 12,
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "Enter designation (e.g., CEO, Lead Architect)",
    span: 12,
    required: true,
  },
  {
    name: "experience",
    label: "Experience",
    type: "text",
    placeholder: "e.g., 15+ years in interior design",
    span: 12,
    required: true,
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write a short biography or mission statement",
    span: 24,
  },
// ⭐ Fully aligned with backend
  {
    name: "specialties",
    label: "Specialties",
    type: "dynamicList",
    placeholder: "Add specialties (e.g., Modern Design, Luxury Interior)",
    span: 24,
    fields: [
      {
        name: "specialty",
        label: "Specialty",
        type: "text",
        placeholder: "Enter specialty",
        span: 24,
        required: true,
      },
    ],
  },
  // {
  //   name: "specialties",
  //   label: "Specialties",
  //   type: "dynamicList",
  //   placeholder: "Add specialties (e.g., Modern Design, Luxury Interior)",
  //   span: 24,
  //   fields: [
  //     {
  //       name: "specialty",
  //       label: "Specialty",
  //       type: "text",
  //       placeholder: "Enter specialty",
  //       span: 24,
  //       required: true,
  //     },
  //   ],
  // },
  {
    name: "social",
    label: "Social Links",
    type: "dynamicList",
    placeholder: "Add platform and URL",
    span: 24,
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "text",
        required: true,
        placeholder: "Enter platform name",
      },
      {
        name: "link",
        label: "URL",
        type: "text",
        required: true,
        placeholder: "Enter Url/link",
      },
    ],
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "upload",
    span: 12,
    required: true,
  },
];
export const overviewFormFields: FormField[] = [
  {
    name: "page",
    label: "Page",
    type: "select",
    span: 12,
    required: true,
    options: [
      { label: "Home", value: "home" },
      { label: "Contact", value: "contact" },
      { label: "Services", value: "services" },
    ],
  },
  {
    name: "items",
    label: "Overview Items",
    type: "dynamicList",
    span: 24,
    fields: [
      {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
        placeholder: "Enter title",
      },
      {
        name: "value",
        label: "Value",
        type: "text",
        required: true,
        placeholder: "Enter value",
      },
      {
        name: "icon",
        label: "Icon (optional)",
        type: "text",
        placeholder: "Enter icon name or URL",
      },
    ],
  },
];
export const categoryFormFields: FormField[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    placeholder: "Enter category name",
    span: 12,
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter category description",
    span: 24,
    required: false,
  },
  // Example optional: you could add an active switch if needed
  // {
  //   name: "isActive",
  //   label: "Active Status",
  //   type: "switch",
  //   span: 12,
  //   initialValue: true,
  // },
];
