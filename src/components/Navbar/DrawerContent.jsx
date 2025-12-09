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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

// MUI Icons
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import BallotIcon from "@mui/icons-material/Ballot";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// style
import styles from "@/components/Navbar/Navbar.module.css";

// Context
import { SaveInfoContext } from "@/context/SaveInfo";

export function DrawerContent({ activeTitle, onItemClick }) {
  const { t } = useTranslation();
  const { user, logout } = useContext(SaveInfoContext);

  const handleLogout = () => {
    if (onItemClick) onItemClick();
    logout();
  };

  return (
    <Box>
      <Box className={styles.panelHello} elevation={3}>
        <Typography variant="h5">
          {t("navbar.hello", { name: user.username })}
        </Typography>
        <Typography className={styles.subtitle} variant="subtitle1">
          {t(activeTitle)}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "bisque" }} />
      <List>
        <ListItem>
          <NavLink to="/home" onClick={onItemClick}>
            <IconButton>
              <AutoStoriesIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.allPosts")}
          </NavLink>
        </ListItem>
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:before": { display: "none" },
            width: "100%",
            margin: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: "bisque" }} />}
            aria-controls="panel-content"
            id="panel-header"
            sx={{
              padding: "0 16px",
              minHeight: "48px",
              color: "bisque",
              "& .MuiAccordionSummary-content": {
                margin: 0,
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                color: "bisque",
              }}
            >
              <BarChartIcon />
            </Box>
            {t("navbar.userPanel")}
          </AccordionSummary>
          <AccordionDetails
            sx={{ padding: 0, paddingLeft: 2, color: "bisque" }}
          >
            <List sx={{ padding: 0 }}>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                }}
              >
                <NavLink to="/panel" onClick={onItemClick}>
                  <Box
                    component="span"
                    sx={{ padding: "8px", color: "bisque" }}
                  >
                    <HomeFilledIcon />
                  </Box>
                  {t("navbar.home")}
                </NavLink>
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                }}
              >
                <NavLink to="/create-post" onClick={onItemClick}>
                  <Box
                    component="span"
                    sx={{ padding: "8px", color: "bisque" }}
                  >
                    <PostAddIcon />
                  </Box>
                  {t("navbar.createNewPost")}
                </NavLink>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <ListItem>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <BallotIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.projects")}
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <GroupIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.team")}
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <TrendingUpIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.reports")}
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <PersonIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.user")}
          </NavLink>
        </ListItem>
      </List>
      <Divider sx={{ borderColor: "bisque" }} />
      <List>
        <ListItem>
          <NavLink onClick={onItemClick}>
            <IconButton>
              <SettingsIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.settings")}
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/" onClick={handleLogout}>
            <IconButton>
              <LogoutIcon sx={{ color: "bisque" }} />
            </IconButton>
            {t("navbar.logout")}
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );
}
