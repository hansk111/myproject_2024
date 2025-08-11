"use client";

import BlogDetail from "@/app/(DashboardLayout)/components/apps/blog/detail";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const PostDetail = () => {
  return (
    <PageContainer title="Blog Detail" description="This is Blog Detail">
      <BlogDetail />
    </PageContainer>
  );
};

export default PostDetail;
