import * as React from "react";
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
          boxSizing: "border-box",
          backgroundColor: "#172f70",
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
