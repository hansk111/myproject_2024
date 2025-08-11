// "use client"

// import React, { useState } from 'react';
// import Box from '@mui/material/Box'
// import Divider from '@mui/material/Divider'
// import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
// import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// import ChatSidebar from '@/app/(DashboardLayout)/components/apps/chats/ChatSidebar';
// import ChatContent from '@/app/(DashboardLayout)/components/apps/chats/ChatContent';
// import ChatMsgSent from '@/app/(DashboardLayout)/components/apps/chats/ChatMsgSent';
// import AppCard from '@/app/(DashboardLayout)/components/shared/AppCard';

// const Chats = () => {
//   const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   return (
//     <PageContainer title="Chat" description="this is Chat">
//       <Breadcrumb title="Chat app" subtitle="Messenger" />
//       <AppCard>
//         {/* ------------------------------------------- */}
//         {/* Left part */}
//         {/* ------------------------------------------- */}

//         <ChatSidebar
//           isMobileSidebarOpen={isMobileSidebarOpen}
//           onSidebarClose={() => setMobileSidebarOpen(false)}
//         />
//         {/* ------------------------------------------- */}
//         {/* Right part */}
//         {/* ------------------------------------------- */}

//         <Box flexGrow={1}>
//           <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
//           <Divider />
//           <ChatMsgSent />
//         </Box>
//       </AppCard>
//     </PageContainer>
//   );
// };

// export default Chats;
"use client"

import React, { useState } from 'react';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ChatSidebar from '@/app/(DashboardLayout)/components/apps/chats/ChatSidebar';
import ChatContent from '@/app/(DashboardLayout)/components/apps/chats/ChatContent';
import ChatMsgSent from '@/app/(DashboardLayout)/components/apps/chats/ChatMsgSent';
import AppCard from '@/app/(DashboardLayout)/components/shared/AppCard';

const Chats = () => {
  console.log("chats start-----------------")
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // const [session, setSession] = useState('대화를 선택하세요..');
  
  // const handleSessionChange = (session: string) => {
  //   setSession(session);
  //   // console.log("session", session)
  // };

  return (
    <PageContainer title="Chat" description="this is Chat">
      <Breadcrumb title="Chat app" subtitle="Messenger" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        <ChatSidebar
          // handleSessionChange={handleSessionChange}          
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          // session={session}        
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1}>
          <ChatContent
            // session={session}
            toggleChatSidebar={() => setMobileSidebarOpen(true)} 
          />
          <Divider />
          <ChatMsgSent 
            // session={session}
          />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
