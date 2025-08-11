"use client";

import BlogEdit from "@/app/(DashboardLayout)/components/apps/blog/edit/BlogEdit";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const PostEdit = () => {
  return (
    <PageContainer title="Blog Post" description="This is Blog Post Edit">
      <BlogEdit />
    </PageContainer>
  );
};

export default PostEdit;
