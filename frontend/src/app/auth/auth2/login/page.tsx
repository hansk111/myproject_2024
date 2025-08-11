"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";

// components
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AuthLogin from "../../authForms/AuthLogin";
import { useLogin } from "@/hooks";

export default function Login2() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  const config = [
    {
      labelText: "Email",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
      autoComplete: "off",
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      required: true,
      autoComplete: "off",
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
    },
  ];

  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
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
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                config={config}
                isLoading={isLoading}
                btnText="Log in"
                onChange={onChange}
                onSubmit={onSubmit}
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      New to here?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/auth/auth2/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Login2.layout = "Blank";
