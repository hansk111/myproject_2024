"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import PssswordResetConfirmForm from "@/app/auth/authForms/PasswordResetConfirmForm";
import { useResetPasswordConfirm } from "@/hooks";

// export const metadata = {
//     title: 'Full Auth | Password Reset Confirm',
//     description: 'Full Auth Password Reset confirm page',  
// };

interface Props {
  params: {
    uid: string;
    token: string;
  }

}

export default function Page( { params: { uid, token }}: Props) {

    const { new_password, re_new_password, isLoading, onChange, onSubmit } = useResetPasswordConfirm(uid, token);
    const config = [
        {
            labelText: 'New password',
            labelId: 'new_password',
            type: 'password',
            // onChange,
            // onSubmit,
            value: new_password,
            required: true,
            autocomplete: 'off',
        },
        {
            labelText: 'Confirm new password',
            labelId: 're_new_password',
            type: 'password',
            // onChange,
            // onSubmit,
            value: re_new_password,
            required: true,
            autocomplete: 'off',
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
                <PssswordResetConfirmForm
                  uid={uid} 
                  token={token}
                  config={config}
                  isLoading={isLoading}
                  btnText="Reset your password"
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
                        New to Modernize?
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