"use client";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import BlogListing from "@/app/(DashboardLayout)/components/apps/blog/BlogListing";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

const Blog = () => {
  const router = useRouter();
  const handleAddClick = () => {
    router.push("/apps/blog/create");
  };

  return (
    <PageContainer title="Blog" description="this is Blog">
      <Breadcrumb title="Blog app" subtitle="Get the latest news" />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
      <Grid item lg={12} sm={12} mt={3}>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button color="success" variant="contained" onClick={handleAddClick}>
            글쓰기
          </Button>
        </Stack>
      </Grid>
    </PageContainer>
  );
};

export default Blog;
