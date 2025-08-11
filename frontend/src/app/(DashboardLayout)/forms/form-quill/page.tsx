"use client";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import "./Quill.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props}  />;
  },
  {
    ssr: false,
  }
);

import Paper from "@mui/material/Paper";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import ParentCard from "@/app/(DashboardLayout)/components/shared/ParentCard";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Quill Editor",
  },
];

const QuillEditor = () => {
  const [text, setText] = useState("");

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["code-block", "link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <PageContainer title="Quill Editor" description="this is Quill Editor">
      {/* breadcrumb */}
    <Breadcrumb title="Quill Editor" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title="Quill Editor">
    <Paper sx={{ border: `1px solid ${borderColor}` }} variant="outlined">
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        value={text}
        onChange={(value: any) => {
          setText(value);
        }}
        placeholder="Type here..."
        style={{ height: '250px', overflowY: 'auto' }}
      />
    </Paper>
    </ParentCard>
    </PageContainer>
  );
};

export default QuillEditor;
