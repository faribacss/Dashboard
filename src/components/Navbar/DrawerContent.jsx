// Library
import * as React from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

// MUI components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

// MUI Icons
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import BallotIcon from "@mui/icons-material/Ballot";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// style
import styles from "@/components/Navbar/Navbar.module.css";

// Context
import { SaveInfoContext } from "@/context/SaveInfo";
import { useLocation } from "react-router";
import ChangeLang from "@/components/language/ChangeLang";

export function DrawerContent({ activeTitle, onItemClick }) {
  const { t } = useTranslation();
  const { user, logout } = useContext(SaveInfoContext);
   const { pathname } = useLocation();
  const isDashboard = pathname === "/panel";
  const handleLogout = () => {
    if (onItemClick) onItemClick();
    logout();
  };

  return (
    <Box>
      <Box className={styles.panelHello} elevation={3}>
        <Typography className={styles.helloText} variant="h5">
          {t("navbar.hello", { name: user.username })}
        </Typography>
        <div>
          <Typography
            sx={{ color: "#2D3748", fontSize: "13px", fontWeight: "bold" }}
          >
            {!isDashboard && (
              <>
                <NavLink
                  to="/panel"
                  onClick={onItemClick}
                  style={{ textDecoration: "none", color: "#E1C6A8" }}
                >
                  {t("navbar.goToDashboard")}
                </NavLink>
              </>
            )}
            {t(activeTitle)}
          </Typography>
        </div>
      </Box>
      <Divider sx={{ bordercolor: " #E1C6A8" }} />
      <List>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink to="/panel" onClick={onItemClick}>
            <IconButton>
              <HomeFilledIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.userPanel")}
          </NavLink>
        </ListItem>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink to="/home" onClick={onItemClick}>
            <IconButton>
              <AutoStoriesIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.allPosts")}
          </NavLink>
        </ListItem>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink to="/create-post" onClick={onItemClick}>
            <IconButton>
              <PostAddIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.createNewPost")}
          </NavLink>
        </ListItem>

        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <BallotIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.projects")}
          </NavLink>
        </ListItem>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <GroupIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.team")}
          </NavLink>
        </ListItem>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <TrendingUpIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.reports")}
          </NavLink>
        </ListItem>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <PersonIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.user")}
          </NavLink>
        </ListItem>
      </List>
      <Divider sx={{ borderColor: "bisque" }} />
      <List>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <SettingsIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.settings")}
          </NavLink>
        </ListItem>
        <ListItem sx={{ color: " #E1C6A8" }}>
          <NavLink to="/" onClick={handleLogout}>
            <IconButton>
              <LogoutIcon sx={{ color: " #E1C6A8" }} />
            </IconButton>
            {t("navbar.logout")}
          </NavLink>
        </ListItem>
      </List>
        <List>
          <ListItem>
            <ChangeLang />
          </ListItem>
        </List>
    </Box>
  );
}
