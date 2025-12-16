// library
import * as React from "react";

// MUI components
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export function MobileDrawer({ open, onClose, children, isRtl }) {

  return (
    <Drawer
      variant="temporary"
      anchor={isRtl ? "right" : "left"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(to right, #064829, #889B4A)",
          color: "bisque",
          ...(isRtl && {direction: "rtl"}),
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
