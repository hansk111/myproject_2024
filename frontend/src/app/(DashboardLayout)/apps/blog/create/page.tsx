"use client";

import BlogCreate from "@/app/(DashboardLayout)/components/apps/blog/create/BlogCreate";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const PostCreate = () => {
  return (
    <PageContainer title="Blog Post" description="this is Blog Post Create">
      <BlogCreate />
    </PageContainer>
  );
};

export default PostCreate;
