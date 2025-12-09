// Library
import React from "react";

// MUI Icons
import { Visibility, VisibilityOff } from "@mui/icons-material";

// MUI Components
import { InputAdornment, IconButton } from "@mui/material";

function ShowPassword({ showPassword, onToggle }) {
    const handleClickShowPassword = () => onToggle();
    const handleMouseDownPassword = (event) => {
    event.preventDefault();};
    const handleMouseUpPassword = (event) => {
    event.preventDefault();};

    return(
        <>
            <InputAdornment position="end">
                <IconButton aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
                </>
    )
}
export default ShowPassword;