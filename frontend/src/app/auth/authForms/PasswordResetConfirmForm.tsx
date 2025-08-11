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
import { ChangeEvent, FormEvent } from "react";

interface Config {
    labelText: string;
    labelId: string;
    type: string;
    value: string;
    link?: {
      linkText: string;
      linkUrl: string;
    };
    required?: boolean;
    autoComplete?: string;
  }

interface Props {

    uid: string;
    token: string;
    config: Config[];
    isLoading: boolean;
    btnText: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;  
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];

}

const PssswordResetConfirmForm = ({
  uid,
  token,
  config,
  isLoading,
  btnText,
  onChange,
  onSubmit,
  title,
  subtitle,

}: Props) => (
  <>

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
          Reset your password
        </Typography>
      </Divider>
    </Box>
    <Box component="form" onSubmit={onSubmit}>
      <Stack>
        {config.map((input) => (
          <>
            <CustomFormLabel htmlFor={input.labelId}>{input.labelText}</CustomFormLabel>
            <CustomTextField key={input.labelId} id={input.labelId} name={input.labelId} type={input.type} value={input.value} required={input.required} onChange={onChange} variant="outlined" autocomplete={input.autoComplete} fullWidth />
          </>
        ))}
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >     

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

export default PssswordResetConfirmForm;
