"use client";
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import AuthRegister from '../../authForms/AuthRegister';
import { useRegister } from '@/hooks';

export default function Register2() {

  const {first_name, 
    last_name, 
    email, 
    password, 
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister();

  const config = [
    {
      labelText: 'First name',
      labelId: 'first_name',
      type: 'text',
      value: first_name,
      required: true,
      autocomplete: 'off',
    },
    {
      labelText: 'Last name',
      labelId: 'last_name',
      type: 'text',
      value: last_name,
      required: true,
      autocomplete: 'off',
    },
    {
      labelText: 'Email address',
      labelId: 'email',
      type: 'email',
      value: email,
      required: true,
      autocomplete: 'off',
    },
    {
      labelText: 'Password',
      labelId: 'password',
      type: 'password',
      value: password,
      required: true,
      autocomplete: 'off',
    },
    {
      labelText: 'Confirm password',
      labelId: 're_password',
      type: 'password',
      value: re_password,
      required: true,
      autocomplete: 'off',
    },
  ];

  return(
  <PageContainer title="Register Page" description="this is Sample page">
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <AuthRegister
              config={config}
              isLoading={isLoading}
              btnText='Sign UP'
              onChange={onChange}
              onSubmit={onSubmit}
              subtext={
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                  Your Social Campaigns
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Already have an Account?
                  </Typography>
                  <Typography 
                    component={Link}
                    href="/auth/auth2/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
)};

Register2.layout = "Blank";

