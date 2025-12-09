// Library
import React from "react";

// MUI Components
import { Chip, Stack } from "@mui/material";

// MUI Icons 
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';

function SocialLoginButtons() {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      className="auth-connections-stack"
    >
      <Chip 
        className="connections" 
        icon={<GoogleIcon className="google-icon" />} 
        label="Sign in with Google" 
      />
      <Chip 
        className="connections" 
        icon={<AppleIcon className="apple-icon" />} 
        label="Sign in with Apple" 
      />
    </Stack>
  );
}

export default SocialLoginButtons;