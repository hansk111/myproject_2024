import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";
import Spinner from "@/app/(DashboardLayout)/ui-components/common/Spinner";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";

interface Config {
  labelText: string;
  labelId: string;
  type: string;
  value: string;
  // link?: {
  //     linkText: string;
  //     linkUrl: string;
  // }
  required?: boolean;
  autoComplete?: string;
}

interface Props {
  config: Config[];
  isLoading: boolean;
  btnText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function AuthForgotPassword({config, isLoading, onChange, onSubmit, btnText}:Props){
 return (

  <Box component="form" onSubmit={onSubmit}>
    <Stack mt={4} spacing={2}>
      {config.map((input) => (
          <>
            <CustomFormLabel htmlFor={input.labelId}>{input.labelText}</CustomFormLabel>
            <CustomTextField key={input.labelId} id={input.labelId} name={input.labelId} type={input.type} value={input.value} required={input.required} onChange={onChange} variant="outlined" autocomplete={input.autoComplete} fullWidth />
          </>
      ))}
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
      <Button
        color="primary"
        size="large"
        fullWidth
        component={Link}
        href="/auth/auth2/login"
      >
        Back to Login
      </Button>
    </Stack>
  </Box>

)};
