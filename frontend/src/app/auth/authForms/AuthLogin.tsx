"use client";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import Spinner from "@/app/(DashboardLayout)/ui-components/common/Spinner";

const AuthLogin = ({
  config,
  isLoading,
  btnText,
  title,
  onChange,
  onSubmit,
  subtitle,
  subtext,
}: loginType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <AuthSocialButtons title="Sign in with" />
    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign in with
        </Typography>
      </Divider>
    </Box>
    <Box component="form" onSubmit={onSubmit}>
      <Stack>
        {config.map((input) => (
          <Box key={input.labelId}>
            <CustomFormLabel htmlFor={input.labelId}>{input.labelText}</CustomFormLabel>
            <CustomTextField              
              id={input.labelId}
              name={input.labelId}
              type={input.type}
              variant="outlined"
              onChange={onChange}
              fullWidth
              autoComplete={input.autoComplete}
            />
          </Box>  
        ))}
        {/* <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            name="email"
            type="email"
            variant="outlined"
            onChange={onChange}
            fullWidth
            autoComplete={config[0].autoComplete}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            onChange={onChange}
            fullWidth
            autoComplete={config[1].autoComplete}
          />
        </Box> */}
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/auth/auth2/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          // href="/"
          type="submit"
        >
          {isLoading ? <Spinner sm /> : `${btnText}`}
        </Button>
      </Box>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
