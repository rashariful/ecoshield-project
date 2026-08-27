// // import { useEffect, useRef } from "react";
// // import Quill from "quill";
// // import "quill/dist/quill.snow.css";

// // interface Props {
// //   value?: string;
// //   onChange?: (content: string) => void;
// // }

// // const RichTextEditor: React.FC<Props> = ({ value = "", onChange }) => {
// //   const editorRef = useRef<HTMLDivElement>(null);
// //   const quillRef = useRef<Quill | null>(null);

// //   // ✅ Initialize editor only once
// //   useEffect(() => {
// //     if (!editorRef.current || quillRef.current) return;

// //     quillRef.current = new Quill(editorRef.current, {
// //       theme: "snow",
// //       modules: {
// //         toolbar: [
// //           ["bold", "italic", "underline", "strike"],
// //           [{ header: [1, 2, 3, false] }],
// //           [{ list: "ordered" }, { list: "bullet" }],
// //           ["link", "image"],
// //           ["clean"],
// //         ],
// //       },
// //     });

// //     quillRef.current.on("text-change", () => {
// //       const html =
// //         editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
// //       onChange?.(html);
// //     });
// //   }, []);

// //   // ✅ Update value when editing existing data
// //   useEffect(() => {
// //     if (quillRef.current && value) {
// //       const editor = quillRef.current.root.innerHTML;

// //       if (editor !== value) {
// //         quillRef.current.clipboard.dangerouslyPasteHTML(value);
// //       }
// //     }
// //   }, [value]);

// //   return <div ref={editorRef} style={{ minHeight: "300px" }} />;
// // };

// // export default RichTextEditor;


// import { useEffect, useRef } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// // import ImageResize from "quill-image-resize-module";

// interface Props {
//   value?: string;
//   onChange?: (content: string) => void;
// }

// const RichTextEditor: React.FC<Props> = ({ value = "", onChange }) => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);

//   useEffect(() => {
//     if (editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
// //         modules: {a
// //   toolbar: [
// //     [{ font: [] }],
// //     [{ size: ["small", false, "large", "huge"] }],

// //     [{ header: [1, 2, 3, 4, false] }],

// //     ["bold", "italic", "underline", "strike"],
// //     [{ color: [] }, { background: [] }],

// //     [{ script: "sub" }, { script: "super" }],

// //     [{ list: "ordered" }, { list: "bullet" }],
// //     [{ indent: "-1" }, { indent: "+1" }],

// //     [{ align: [] }],

// //     ["link", "image", "blockquote", "code-block"],

// //     ["clean"]
// //   ]
// // }
//         modules: {
//           toolbar: [
//             ["bold", "italic", "underline", "strike"],
//             [{ header: [1, 2, 3, false] }],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["link", "image"],
//             ["clean"]
//           ],
          
//         }
//       });

//       // Set initial content
//       quillRef.current.clipboard.dangerouslyPasteHTML(value);

//       // onChange handler
//       quillRef.current.on("text-change", () => {
//         const html = editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
//         onChange?.(html);
//       });
//     }

//     return () => {
//       quillRef.current = null;
//     };
//   }, [onChange, value]);

//   return <div ref={editorRef} style={{ minHeight: "300px" }} />;
// };

// export default RichTextEditor;



import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
// import ImageResize from "quill-image-resize-module";

interface Props {
  value?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<Props> = ({ value = "", onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"]
          ],
          
        }
      });

      // Set initial content
      quillRef.current.clipboard.dangerouslyPasteHTML(value);

      // onChange handler
      quillRef.current.on("text-change", () => {
        const html = editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
        onChange?.(html);
      });
    }

    return () => {
      quillRef.current = null;
    };
  }, []);

  return <div ref={editorRef} style={{ minHeight: "300px" }} />;
};

export default RichTextEditor;
