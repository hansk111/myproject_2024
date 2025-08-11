import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// components
import BlankCard from '../../shared/BlankCard';
import { Stack } from '@mui/system';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons-react';
import Categorytable from '../../tables/Categorytable';

const CategoryTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <BlankCard>
            <Grid item xs={12}>
            <Box>
              <Categorytable />
            </Box>
            </Grid>
          </BlankCard>
        </Grid>
      
      </Grid>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary" disabled={true}>
          Add
        </Button>
        <Button size="large" variant="text" color="error" disabled={true}>
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default CategoryTab;
