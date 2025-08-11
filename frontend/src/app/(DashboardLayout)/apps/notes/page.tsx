"use client"

import { useState, useEffect } from "react";
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import NoteSidebar from '@/app/(DashboardLayout)/components/apps/notes/NoteSidebar';
import NoteContent from '@/app/(DashboardLayout)/components/apps/notes/NoteContent';
import AppCard from '@/app/(DashboardLayout)/components/shared/AppCard';
import { useFetchNotesQuery } from "@/store/apps/notes/NoteApiSlice";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Notes",
  },
];

export default function Notes() {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const { data: notess } = useFetchNotesQuery();
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    if (lgDown) {
      setMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setMobileSidebarOpen(true);
    }
  }, [lgDown]);

  return (
    <PageContainer title="Note App" description="this is Note App">
      <Breadcrumb title="Note app" items={BCrumb} />
      <AppCard>
        {isMobileSidebarOpen ? (
          <NoteSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
            notess={notess}
          />
        ) : (
          <></>
        )}

        <Box flexGrow={1}>
          <NoteContent
            toggleNoteSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </Box>
      </AppCard>
    </PageContainer>
  );
};


