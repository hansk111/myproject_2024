"use client";
// https://ryugaram.tistory.com/170
// https://velog.io/@skdbsqls/230823-React-Quill-Image-Resize-%EB%A9%94%EB%AA%A8%EB%A6%AC

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import "./Quill.css";
import ReactQuill from 'react-quill';
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Paper from "@mui/material/Paper";
import { NotesType } from "@/app/(DashboardLayout)/types/apps/notes";
import ParentCard from "@/app/(DashboardLayout)/components/shared/ParentCard";
import { useUploadImageMutation } from "@/store/apps/notes/NoteApiSlice";

import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { useUploadpostImageMutation } from "@/store/apps/blog/BlogApiSlice";

const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    
    RQ.Quill.register("modules/imageActions", ImageActions);
    RQ.Quill.register("modules/imageFormats", ImageFormats);

    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const QuillEditor = ({ note, setNote, readOnly}:any) => {
  const quillRef = useRef<ReactQuill>(null);
  // const [file, setFile] = useState<File | null>(null);
  const [uploadpostImage, { isLoading, isError, error }] = useUploadpostImageMutation();
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().enable(!readOnly);
    }
  }, [quillRef, readOnly]); 

  const handleChange = (value: string) => {
    setNote((prev: NotesType) => ({
      ...prev,
      content: value,
    }));
  }; 
  
  const insertImage = (url: string) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection();
    if (editor && range && url) {
      editor.insertEmbed(range.index, 'image', url);
      editor.setSelection(range.index + 1, 0);
    }
    else {
      console.error('에디터, 범위 또는 URL이 유효하지 않습니다.');
    }
   
  };
  
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  
    input.onchange = async () => {
      const formData = new FormData();
      if (!input.files) return;
      const file = input.files[0];

      formData.append('image', file);
      // console.log("formData", formData);
      const response = await uploadpostImage(formData).unwrap();
      // console.log("response", response.url);
      const imgurl = `${process.env.NEXT_PUBLIC_HOST}/${response.url}`
      insertImage(imgurl);
      // console.log("insert image ok")

      
    };
  };

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
    "align",
    "color",
    "background",
    "image",
    "video",
    'align',
    'float',
    'height',
    'width',
    'code-block',
  ];
  
  const viewModeModules = useMemo(() => ({
    toolbar: false,
  }), [quillRef, readOnly]);

  const modules = useMemo(() => ({
    imageActions: {},
    imageFormats: {},

    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ["code-block",'link',"video"],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },

      ImageResize: {
        modules: ['Resize']
      }

    },}), []);

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */


  return (
      <ReactQuillWrapper  
        forwardedRef={quillRef}   
        // modules={modules}
        modules={readOnly ? viewModeModules : modules}       
        formats={formats}
        theme="snow"
        value={note.content || ''}
        onChange={handleChange}       
        placeholder="Type here..."
        style={{ height: 'auto', overflowY: 'hidden' }}
        readOnly={readOnly}
      />  
  );
};

export default QuillEditor;

