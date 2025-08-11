"use client";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";

import { useEffect, useState } from "react";
import React from "react";
import { FormControlLabel, Button, Grid, MenuItem, Box } from "@mui/material";
// import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import ParentCard from "../../../shared/ParentCard";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
// import CustomCheckbox from "../../../forms/theme-elements/CustomCheckbox";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import FileInput from "../create/FileInput";
import {
  useCreateMutation,
  useGetCategoriesQuery,
  useGetQuery,
  useImage_deleteMutation,
  useUpdatepostMutation,
} from "@/store/apps/blog/BlogApiSlice";
import { useRouter } from "next/navigation";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { setChangePost } from "@/store/apps/blog/BlogSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import QuillEditor from "../quill";
import CustomCheckbox from "../../../forms/theme-elements/CustomCheckbox";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";

const numbers = [
  {
    value: 1,
    label: "여행",
  },
  {
    value: 2,
    label: "식물",
  },
  {
    value: 3,
    label: "자전거",
  },
  {
    value: 4,
    label: "기타",
  },
];

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/apps/blog/edit/id",
    title: "Blog Post Edit",
  },
  {
    title: "Post edit",
  },
];

interface blogCreateType {
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

interface BlogCreate {
  initialValues?: BlogCreate;
  initialPreview: string;
  title: string;
  content: string;
  featured: boolean;
  coverImg: File | null;
  categories: any;
}

const INITIAL_VALUES: BlogCreate = {
  initialPreview: "/images/blog/upload.jpg",
  title: "제목을 적어 주세요",
  featured: true,
  content: "내용을 적어 주세요",
  categories: 1,
  coverImg: null,
};


const BlogEdit = () => {
  const [values, setValues] = useState(INITIAL_VALUES);
  // const [model, setModel] = useState(() => {
  //   return localStorage.getItem("savedText") || "";
  // });
  const {data:category_list, isLoading, error} = useGetCategoriesQuery();
  const post:any = useSelector((state) => state.blog.selectedPost)
  const [updatepost] = useUpdatepostMutation();
  console.log("post====", post)


  useEffect(() => {
    console.log("useEffect--------------------------------")
    if (post) {

      let ca_num:number;

      switch (String(post.categories)) {
        case "여행":
          ca_num = 1;
          break;
        case "식물":
          ca_num = 2;
          break;
        case "자전거":
          ca_num = 3;
          break;
        case "기타":
          ca_num = 4;
          break;
        default:
          // value가 어떤 경우에도 해당하지 않을 때의 처리 (선택적)
          ca_num = 0; // 또는 다른 기본값 설정
          break;
      }
      
      console.log("post.featured", post.featured)

      setValues({
        ...values,
        initialPreview: post?.coverImg,
        title: post.title,
        featured: post.featured,
        content: post.content,
        categories: ca_num,
        coverImg: null,
      });
      console.log("post.featured===", post.featured)
    }
  }, [post]);
  
  console.log("values====", values)
  const [create] = useCreateMutation();
  const [image_delete] = useImage_deleteMutation();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(INITIAL_VALUES.featured);
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [post, setPost] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const dispatch = useDispatch();



  

  const handleChange = (name: any, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // console.log(values);
  };


  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    setValues({...values,
      featured: event.target.checked,
  })
  };

  const handleComboboxChange = (event: any) => {
    const { value } = event.target;
    console.log("🚀 ~ handleComboboxChange ~ value:", value)
    
    setValues({...values,
      categories: value,
    })
    // handleChange("categories", value);
    // console.log("🚀 ~ handleComboboxChange ~ value:", value)
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  const handleImagedelete = async (imgUrl: string) => {
    // // console.log("🚀 ~ handleImagedelete ~ src:", imgUrl);

    image_delete({ imgUrl });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    // formData.append("content", model);
    formData.append("content", values.content);
    formData.append("featured", String(values.featured));
    formData.append("categories", String(values.categories));
    
    if (values.coverImg) {
      formData.append("coverImg", values.coverImg);

    }
    console.log("🚀 ~ handleSubmit ~ formData:", post.id);



    const postid = post.id
    updatepost({postid: post!.id, formData})
      .unwrap()
      .then(() => {
        toast.success("Post updated");
        dispatch(setChangePost());
        localStorage.removeItem("savedText");
        router.push("/apps/blog/");
      })
      .catch((response) => {
        toast.error(response.data.detail);
      });
    // setValues(INITIAL_VALUES);
  };

  return (
    <>
      {/* breadcrumb */}
      <Breadcrumb title="Blog Post Edit" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <ParentCard title="Post Edit">
            <form onSubmit={handleSubmit}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="title"
              >
                Post Subject
              </CustomFormLabel>
              <CustomTextField
                // ref={inputRef}
                id="title"
                name="title"
                variant="outlined"
                value={values.title}
                onChange={handleInputChange}
                fullWidth
              />

              <CustomFormLabel htmlFor="file">Cover Image</CustomFormLabel>

              <FileInput
                className="FileInput"
                name="coverImg"
                value={values.coverImg}
                initialPreview={post?.coverImg ? `${process.env.NEXT_PUBLIC_HOST}/media/${post?.coverImg}` : "/images/blog/upload.jpg"}
                // initialPreview={`${process.env.NEXT_PUBLIC_HOST}/media/${values.coverImg}`}
                onChange={handleChange}
              />
              <CustomFormLabel htmlFor="outlined-multiline-static">
                Post Contents
              </CustomFormLabel>

              <QuillEditor note = {values} setNote= {setValues} readOnly={readOnly} >
              </QuillEditor>
              <Grid container spacing={0} my={2}>
                <Grid item lg={4} md={6} sm={12}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        name="featured"
                        checked={values.featured}
                        onChange={handleCheckboxChange}
                        color="primary"
                      />
                    }
                    label="Check this featured post"
                  />
                </Grid>
              </Grid>
              <CustomFormLabel htmlFor="standard-select-number">
                Select Post Category
              </CustomFormLabel>
              <CustomSelect
                fullWidth
                id="standard-select-number"
                name="categories"
                type="number"
                variant="outlined"
                value={values?.categories}              
                onChange={
                  handleComboboxChange  as (event: ChangeEvent<HTMLInputElement>) => void
                }
                sx={{
                  mb: 2,
                }}
              >
                {numbers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
              <Box
                m={1}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button color="primary" variant="contained" type="submit">
                  Post Edit OK
                </Button>
              </Box>
            </form>
          </ParentCard>
        </Grid>
      </Grid>
    </>
  );
};

export default BlogEdit;
