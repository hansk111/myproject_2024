import { Box, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import Spinner from "@/app/(DashboardLayout)/ui-components/common/Spinner";

const AuthRegister = ({ config, isLoading, btnText, onChange, onSubmit, title, subtitle, subtext }: registerType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}
    <AuthSocialButtons title="Sign up with" />

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
          or sign up with
        </Typography>
      </Divider>
    </Box>

    <Box component="form" onSubmit={onSubmit}>
      <Stack mb={3}>
        {config.map((input) => (
          <div  key={input.labelId}>
            <CustomFormLabel htmlFor={input.labelId}>{input.labelText}</CustomFormLabel>
            <CustomTextField id={input.labelId} name={input.labelId} type={input.type} value={input.value} required={input.required} onChange={onChange} variant="outlined" autoComplete={input.autoComplete} fullWidth />
          </div>
        ))}
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        // component={Link}
        // href="/auth/auth2/login"
        type="submit"
      >
        {isLoading ? <Spinner sm /> : `${btnText}`}
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
