// Library
import * as React from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

// MUI styles and hooks
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// MUI components
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import { MobileAppBar } from "./MobileAppBar";
import { MobileDrawer, DrawerHeader } from "./MobileDrawer";
import { DesktopDrawer } from "./DesktopDrawer";
import { DrawerContent } from "./DrawerContent";



const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const getActiveTitle = (pathname) => {
  const staticRoutes = {
    "/home": "navbar.allPosts",
    "/panel": "navbar.userPanel",
    "/create-post": "navbar.createNewPost",
    "/settings": "navbar.settings",
    "/projects": "navbar.projects",
    "/team": "navbar.team",
    "/reports": "navbar.reports",
    "/users": "navbar.users",
    "/logout": "navbar.logout",
  };
    // بررسی مسیرهای ثابت
  if (staticRoutes[pathname]) {
    return staticRoutes[pathname];
  }
  // بررسی مسیرهای پویا
  if (pathname.startsWith("/edit-post/")) {
    return "navbar.editPost";
  }
  if (pathname.startsWith("/post/")) {
    return "navbar.postDetails";
  }

  // مسیر پیش‌فرض
  return "navbar.userPanel";
};

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { i18n: i18nInstance } = useTranslation();
  const location = useLocation();
  const isRtl = i18nInstance.language === "fa";

  const activeTitle = getActiveTitle(location.pathname);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleDrawerClose = () => setMobileOpen(false);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {isMobile ? (
          <>
            <MobileAppBar onMenuClick={handleDrawerToggle} />
            <MobileDrawer
              open={mobileOpen}
              onClose={handleDrawerClose}
              isRtl={isRtl}
            >
              <DrawerContent
                activeTitle={activeTitle}
                onItemClick={handleDrawerClose}
              />
            </MobileDrawer>
          </>
        ) : (
          <DesktopDrawer isRtl={isRtl}>
            <DrawerContent activeTitle={activeTitle} />
          </DesktopDrawer>
        )}

        <Main open={!isMobile}>{isMobile && <DrawerHeader />}</Main>
      </Box>
    </>
  );
}
