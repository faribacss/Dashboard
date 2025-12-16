// library
import * as React from "react";

// MUI components
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

export function DesktopDrawer({ children, isRtl }) {
  return (
    <Drawer
      variant="permanent"
      anchor={isRtl ? "right" : "left"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "linear-gradient(to right, #064829, #889B4A)",
          border: "none",
          boxSizing: "border-box",
          color: "bisque",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
