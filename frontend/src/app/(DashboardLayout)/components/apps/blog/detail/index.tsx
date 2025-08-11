/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchBlogPost,
  fetchBlogPostwithoutViewUpdate,
} from "@/store/apps/blog/BlogSlice";
import { useRouter, usePathname } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import {
  IconEye,
  IconMessage2,
  IconPoint,
} from "@tabler/icons-react";
import { format } from "date-fns";
import BlogComment from "./BlogComment";
import BlankCard from "../../../shared/BlankCard";
import { useDispatch, useSelector } from "@/store/hooks";
import type { BlogPostType, BlogType } from "../../../../types/apps/blog";
import "react-quill/dist/quill.snow.css";
import "./Quill.css";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useAddCommentMutation, useDeletepostMutation } from "@/store/apps/blog/BlogApiSlice";
import { toast } from "react-toastify";
import Link from "next/link";

import Swal from 'sweetalert2';


import { ChangeEvent } from "react";
import { PostCommentBox } from "./PosCommentBox";
import QuillEditor from "./quill";
// const ReactQuill: any = dynamic(
//   async () => {
//     const { default: RQ } = await import("react-quill");
//     return ({ ...props }) => <RQ {...props} />;
//   },
//   {
//     ssr: false,
//   }
// );


const BlogDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const effectRan = useRef(false);
  const [addComment] = useAddCommentMutation();
  const getId: string | any = pathName.split("/").pop();
  console.log("getId=", getId);
  

  const [commentTxt, setCommentTxt] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentTxt(event.target.value);
  };

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [deletepost] = useDeletepostMutation();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    Swal.fire({
      title: '삭제 하나요?',
      text: "이 작업은 되돌릴 수 없습니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        setAnchorEl(null);
        deletepost(getId)
          .unwrap()
          .then(() => {
            toast.success("post deleted successfully");
            router.push("/apps/blog");
          })
          .catch((response) => {
            console.log("response",response.data.detail)
            toast.error(response.data.detail);
          });
      }
    });
  };  
    

  useEffect(() => {
    if (!effectRan.current) {
      dispatch(fetchBlogPost(getId));
    }

    return () => {
      effectRan.current = true;
    };
  }, [dispatch]);
  
  // Get post
  // const getPost = useSelector(
  //   (state: AppState) => state.blogReducer.selectedPost
  // );
  // console.log("getPost=", getPost);
  // const post: BlogPostType | any = getPost;


  // console.log("post_detail=", post);
  const post :BlogPostType | any  = useSelector((state) => state.blog.selectedPost)
  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/apps/blog/post",
      title: "Blog",
    },
    {
      title: "Post detail",
    },
  ];

  const onSubmit = async (id: number, comment: string) => {
    // const replyId: string = uniqueId("#comm_");
    const newReply = {
      post: id,
      body: comment,
    };
    addComment(newReply)
      .unwrap()
      .then(() => {
        toast.success("comment added successfully");
        dispatch(fetchBlogPostwithoutViewUpdate(getId));
        setCommentTxt("");
        console.log("comment added successfully", newReply)
      })
      .catch(() => {
        toast.error("Failed to comment add");
      });
  };

  // skeleton
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // const [note, setNote] = useState(post);

  return (
    <Box>
      <Breadcrumb title="Blog Detail" items={BCrumb} />
      {post ? (
        <>
          <BlankCard>
            <>
              {isLoading ? (
                <>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={440}
                    sx={{
                      borderRadius: (theme) => theme.shape.borderRadius / 5,
                    }}
                  ></Skeleton>
                </>
              ) : (
                <CardMedia
                  component="img"
                  height="440"
                  image={`${process.env.NEXT_PUBLIC_HOST}/media/${post?.coverImg}`}
                  alt="green iguana"
                />
              )}
              <CardContent>
                <Stack direction="row" sx={{ marginTop: "-30px" }}>
                  <Tooltip
                    title={post ? post?.author_firstname : ""}
                    placement="top"
                  >
                    <Avatar
                      sx={{
                        marginLeft: "10px",
                        marginTop: "-21px",  
                      }}
                      aria-label="recipe"
                      src={`${process.env.NEXT_PUBLIC_HOST}${post?.author?.image}`}
                    ></Avatar>
                  </Tooltip>
                  <Chip
                    sx={{
                      marginLeft: "auto",
                      marginTop: "-21px",
                      backgroundColor: "yellow",
                    }}
                    label={post?.view}
                    size="small"
                  ></Chip>
                  <Chip
                    label={post?.categories}
                    size="small"
                    sx={{
                      marginLeft: "auto",
                      marginTop: "-21px",
                      backgroundColor: "white",
                    }}
                  ></Chip>
                  
                </Stack>
                {/* <Chip
                  label={post?.categories}
                  size="small"
                  sx={{ marginTop: 2 }}
                /> */}
                <Box my={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Stack direction="row" gap={3} alignItems="center">
                    <Stack direction="row" gap={1} alignItems="center">
                      <Typography
                        gutterBottom
                        variant="h1"
                        fontWeight={600}
                        color="inherit"
                        sx={{                  
                          textDecoration: "none" }}
                      >
                        {post?.title}
                      </Typography>
                    </Stack>
                    {/* <Stack direction="row" ml="auto" alignItems="center">
                      <ClickPopover post_id={post?.id} />
                    </Stack> */}
                  </Stack>
                </Box>
                <Stack direction="row" gap={3} alignItems="center">
                  <Stack direction="row" gap={1} alignItems="center">
                    <IconEye size="18" /> {post?.view}
                  </Stack>
                  <Stack direction="row" gap={1} alignItems="center">
                    <IconMessage2 size="18" /> {post?.comments.length}
                  </Stack>

                  <Stack direction="row" ml="auto" alignItems="center">
                    <IconPoint size="18" />
                      {post ? (
                        <>{format(new Date(post.createdAt), "E, MMM d")}</>
                      ) : (
                        ""
                      )}
                  </Stack>
                  <Stack direction="row" gap={1} alignItems="center">
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <IconDotsVertical width={18} />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link href={`/apps/blog/edit/${post.id}`}>
                          <ListItemIcon>
                            <IconEdit width={18} />
                          </ListItemIcon>
                          Edit
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                          <IconTrash width={18} />
                        </ListItemIcon>                      
                        Delete
                      </MenuItem>
                    </Menu>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <CardContent>
                {/* <Typography variant="h2">
                  {post ? `post_id ${post?.id}` : ""} content
                </Typography> */}
                {/* <pre dangerouslySetInnerHTML={{ __html: post?.content }} /> */}
                {/* <FroalaEditorView model={post?.content} /> */}
                <QuillEditor note = {post} setNote= {null} readOnly={true} >
                </QuillEditor>
              </CardContent>
            </>
          </BlankCard>
          <BlankCard sx={{ mt: 3, p: 0 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600}>
                댓글달기
              </Typography>
              <br />

              <Paper
                sx={{ border: `1px solid ${borderColor}` }}
                variant="outlined"
              >
                {/* <ReactQuill
                  // modules={modules}
                  // formats={formats}
                  // theme="snow"
                  value={commentTxt}
                  onChange={(value: any) => {
                    setCommentTxt(value);
                  }}
                  placeholder="Please leave a comment here..."
                /> */}
              <PostCommentBox
                value={commentTxt}
                onChange={onChange}
              /> 
              </Paper>
              <br />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => onSubmit(post.id, commentTxt)}
              >
                댓글올리기
              </Button>
              </div>
              <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
                <Typography variant="h5" fontWeight={600}>
                  댓글들...
                </Typography>
                <Box
                  px={1.5}
                  py={1}
                  color="primary.main"
                  bgcolor={"primary.light"}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {post?.comments.length} 개
                  </Typography>
                </Box>
              </Stack>
              <Box>
                {post?.comments?.map((comment: BlogType | any) => {
                  return <BlogComment comment={comment} key={comment.id} />;
                })}
              </Box>
            </CardContent>
          </BlankCard>
        </>
      ) : (
        "No found"
      )}
    </Box>
  );
};

export default BlogDetail;
