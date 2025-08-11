"use client";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import BlogCard from "./BlogCard";
import { orderBy } from "lodash";
import { useSelector } from "@/store/hooks";
import BlogFeaturedCard from "./BlogFeaturedCard";
import { BlogPostType } from "../../../types/apps/blog";
import { useGetAllQuery } from "@/store/apps/blog/BlogApiSlice";
import { use, useEffect, useState } from "react";
import { changePostDone } from "@/store/apps/blog/BlogSlice";
import { useDispatch } from "@/store/hooks";
import CustomSelect from "../../forms/theme-elements/CustomSelect";
import { MenuItem, Stack } from "@mui/material";

const BlogListing = () => {
  const { isChangePost } = useSelector((state) => state.blog.isChangePost);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const [value, setValue] = useState(4);
  
  const handleChange = (event:any) => {
    setValue(event.target.value);
  };
  // console.log("🚀 ~ BlogListing ~ isChangePost:", isChangePost);
  const filterBlogs = (
    posts: BlogPostType[],
    sortBy: string,
    _cSearch: string
  ) => {
    if (sortBy === "newest") {
      posts = orderBy(posts, ["createdAt"], ["desc"]);
    }
    if (sortBy === "oldest") {
      posts = orderBy(posts, ["createdAt"], ["asc"]);
    }
    if (sortBy === "popular") {
      posts = orderBy(posts, ["view"], ["desc"]);
    }
    if (posts) {
      console.log("🚀 ~ filterBlogs ~ posts:", posts);
      return (posts = posts.filter((t) => t.featured === false));
    }

    return posts;
  };

  // const { data: posts, refetch } = useGetAllQuery();

  const { data: posts_paged, refetch } =useGetAllQuery({page:page, value:value});
  
  const posts = posts_paged?.results ?? [];

  console.log("🚀 ~ BlogListing ~ posts:", posts);
  const items = posts_paged?.count ?? 0;
  
  useEffect(() => {
    setCount(Math.ceil(items / value));
  }, [page, items, value]);



  const handlePostChangeEvent = () => {
    refetch();
    console.log("refetch");
    dispatch(changePostDone());
  };
  useEffect(() => {
    handlePostChangeEvent();
    console.log("useEffect");
  }, [isChangePost]);

  const blogPosts = filterBlogs(posts ? posts : [], "newest", "");

  const filterFeaturedpost = (posts: BlogPostType[]) => {
    return (posts = posts.filter((t) => t.featured));
  };

  const featuredPost = filterFeaturedpost(posts ? posts : []);

  return (
    <Grid container spacing={3}>
      {featuredPost.map((post, index) => {
        return <BlogFeaturedCard index={index} post={post} key={post.title} />;
      })}
      {blogPosts.map((post) => {
        return <BlogCard post={post} key={post.id} />;
      })}
      <Grid item lg={12} sm={12} mt={3}>
        <Stack direction="row" gap={3} alignItems="center">
        <Stack direction="row" gap={3} alignItems="center">
          <CustomSelect
            labelId="month-dd"
            id="month-dd"
            size="small"
            value={value}
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </CustomSelect>
          <span>Posts per page</span>
        </Stack>
        <Stack direction="row" gap={3} alignItems="center">
          <Pagination
            variant="outlined"
            shape="rounded"
            count={count}
            color="primary"
            sx={{ display: "flex", justifyContent: "center" }}
            onChange={(_, value) => setPage(value)}
            size="large"
          />
        </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BlogListing;