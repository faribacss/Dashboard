// library
import * as React from "react";

// MUI components
import Drawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

export function DesktopDrawer({ children, isRtl }) {
  const { i18n } = useTranslation();

  const rtlStyle = i18n.dir() === "rtl"
    ? { background: "linear-gradient(to left,  #064829, #889B4A)" }
    : { background: "linear-gradient(to right,  #064829, #889B4A)" };
  return (
    <Drawer
      variant="permanent"
      anchor={isRtl ? "right" : "left"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          ...rtlStyle,
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
