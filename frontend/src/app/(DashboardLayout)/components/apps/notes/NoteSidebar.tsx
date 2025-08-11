import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NoteList from './NoteList';

const drawerWidth = 260;

interface NoteType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  notess: any;
}

const NoteSidebar = ({ isMobileSidebarOpen, onSidebarClose, notess }: NoteType) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        [`& .MuiDrawer-paper`]: { position: 'relative' },
      }}
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? 'persistent' : 'temporary'}
    >
      <NoteList notess={notess}/>
    </Drawer>
  );
};

export default NoteSidebar;
