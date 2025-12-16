// library
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Aos from "aos";

// context
import { SaveInfoContext } from "@/context/SaveInfo";

// utilities
import getLangProps from "@/utilities/getLangFontClass";

// components from MUI
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

// image import
import errorImg from "@/assets/public/img/notFound.png";

// style
import styles from "@/components/homeArticles/HomeArticles.module.css";

function HomeArticles({
  title,
  id,
  documentId,
  content,
  url,
  publishedAt,
  author,
}) {
  const { fontClass: langFontClass } = getLangProps(styles);
  Aos.init({ duration: 1000 });
  const { user } = useContext(SaveInfoContext);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const alignStyle = isRtl
    ? {
        borderLeft: "8px solid #3d4347",
        borderRight: "1px solid #3d4347",
        borderTop: "2px solid #3d4347",
        borderBottom: "2px solid #3d4347",
      }
    : {
        borderRight: "8px solid #3d4347",
        borderLeft: "1px solid #3d4347",
        borderTop: "2px solid #3d4347",
        borderBottom: "2px solid #3d4347",
      };

  return (
    <Container key={id} className={`${styles.card} ${langFontClass}`}>
      <Box className={styles.cardBody} sx={{ ...alignStyle }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1.5,
            gap: 1,
            padding: "5px 20px",
          }}
        >
          <Avatar className={styles.avatar}>
            {user?.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2">
            <b>{user?.username}</b>
          </Typography>
        </Box>
        <Box className={styles.cardImageContainer}>
          <img
            src={url || null || errorImg}
            alt="article image"
            className={styles.cardImg}
          />
        </Box>
        <Box className={styles.cardContent}>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "monospace", fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className={`${styles.content} ${langFontClass}`}
            sx={{ mb: 1.5 }}
          >
            {content}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontFamily: "revert-layer", fontSize: "16px" }}>
                {t("posts.author")}: {author}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "revert", fontSize: "12px" }}
              >
                {new Date(publishedAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Checkbox
              icon={
                <FavoriteBorder sx={{ color: "red", width: 20, height: 20 }} />
              }
              checkedIcon={
                <Favorite sx={{ color: "red", width: 20, height: 20 }} />
              }
              sx={{ p: 0 }}
            />
          </Box>
        </Box>
        <Button
          component={Link}
          to={`/post/${documentId}`}
          sx={{
            mb: 1,
            color: "#064829",
            textAlign: "left",
          }}
        >
          {t("posts.ShowMore")}
        </Button>
      </Box>
    </Container>
  );
}
export default HomeArticles;
