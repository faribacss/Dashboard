// Library
import * as React from "react";
import { useTranslation } from "react-i18next";

// MUI styles and hooks
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";

// store
import {useStore} from "@/components/store";

// style
import styles from "@/components/Navbar/Navbar.module.css";


const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export function MobileAppBar({ onMenuClick }) {
  const { t } = useTranslation();
  const user = useStore((state) => state.user);

  return (
    <Box className={styles.navbarAppBar}>
      <Toolbar className={styles.navbarBox}>
        <IconButton
          className={styles.navbarMenuIcon}
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Typography
        className={styles.panelHello}
        variant="h6"
        noWrap
        component="div"
      >
        {t("navbar.hello", { name: user.username})}
      </Typography>
    </Box>
  );
}
