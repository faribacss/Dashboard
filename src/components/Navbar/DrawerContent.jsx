// Library
import * as React from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";

// Animation
import { motion, AnimatePresence } from "framer-motion";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudySnowingIcon from "@mui/icons-material/CloudySnowing";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ForestIcon from "@mui/icons-material/Forest";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

// MUI components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import { Typography, useMediaQuery } from "@mui/material";

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
import { theme } from "@/theme/Theme";

// image icons
// --- Spring Icons ---
import sakura from "@/assets/public/img/icons/sakura.png";
import springTree from "@/assets/public/img/icons/tree.png";
// --- Summer Icons ---
import sun from "@/assets/public/img/icons/sun.png";
import watermelon from "@/assets/public/img/icons/watermelon.png";
// --- Autumn Icons ---
import autumnTree from "@/assets/public/img/icons/autumn.png";
import pumpkin from "@/assets/public/img/icons/pumpkin.png";
// --- Snowing Icons ---
import cloudySnowing from "@/assets/public/img/icons/snowman.png";
import Snowing from "@/assets/public/img/icons/snowy.png";

// store
import { useStore } from "@/store";

// Components
import ChangeLang from "@/components/language/ChangeLang";

export function DrawerContent({ activeTitle, onItemClick }) {
  const isDesktop = useMediaQuery(theme.breakpoints.up(720));
  const { t, i18n } = useTranslation();
  const languagePosition =
    i18n.dir() === "rtl"
      ? {
          right: isDesktop ? "25px" : "25px",
          left: isDesktop ? "0" : "0",
          bottom: isDesktop ? "25px" : "25px",
        }
      : {
          right: isDesktop ? "0" : "0",
          left: "-80px",
          bottom: isDesktop ? "25px" : "25px",
        };
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const { pathname } = useLocation();
  const isDashboard = pathname === "/panel";
  const handleLogout = () => {
    if (onItemClick) onItemClick();
    logout();
  };

  const [step, setStep] = useState(0);
  const getSeasonIcon = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4)
      return (
        <>
          <img src={sakura} alt="Sakura" style={{ width: 35, height: 35 }} />
          <img
            src={springTree}
            alt="Spring Tree"
            style={{ width: 35, height: 35 }}
          />
        </>
      );
    if (month >= 5 && month <= 7)
      return (
        <>
          <img src={sun} alt="Sun" style={{ width: 35, height: 35 }} />
          <img
            src={watermelon}
            alt="watermelon"
            style={{ width: 35, height: 35 }}
          />
        </>
      );
    if (month >= 8 && month <= 10)
      return (
        <>
          <img
            src={autumnTree}
            alt="Autumn Tree"
            style={{ width: 35, height: 35 }}
          />
          <img src={pumpkin} alt="Pumpkin" style={{ width: 35, height: 35 }} />
        </>
      );
    return (
      <>
        <img
          src={cloudySnowing}
          alt="Cloudy Snowing"
          style={{ width: 35, height: 35 }}
        />
        <img src={Snowing} alt="Snowing" style={{ width: 35, height: 35 }} />
      </>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  if (!user) return null;

  return (
    <Box>
      <Box
        className={styles.panelHello}
        elevation={3}
        sx={{ overflow: "hidden" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Typography
              className={styles.helloText}
              variant="h5"
              sx={{ display: "flex", alignItems: "center", minHeight: "35px" }}
            >
              {step === 0 && t("navbar.hello", { name: user?.username })}
              {step === 1 && t("navbar.welcome")}
              {step === 2 && getSeasonIcon()}
            </Typography>
          </motion.div>
        </AnimatePresence>
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
      <List className={styles.changeLangDrawer} style={{ ...languagePosition }}>
        <ListItem className={styles.changeLang}>
          <ChangeLang />
        </ListItem>
      </List>
    </Box>
  );
}
