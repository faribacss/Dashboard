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
import { Avatar, Box, Button, Checkbox, Container, Divider, Grid, Typography } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

// image import
import errorImg from "@/assets/public/img/notFound.png";

// style
import styles from "@/components/homeArticles/HomeArticles.module.css";

function HomeArticles({ title, id, documentId, content, url, publishedAt, author }) {
  const { fontClass: langFontClass } = getLangProps(styles);
  Aos.init({ duration: 1000 });
  const { user } = useContext(SaveInfoContext);
  const { t } = useTranslation();
  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

  return (
    <Container
      key={id}
      className={`${styles.card} ${langFontClass}`}
      // data-aos="fade-down"
    >
      <Box className={styles.cardBody}>
        <Box className={styles.spacer}>
          <Avatar className={styles.avatar}>
            {user?.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography>
              {t("posts.Postby")} <b>{user?.username}</b>
            </Typography>
          </Box>
        </Box>
        <Grid className={styles.cardImageContainer}>
          <img
            src={url || null || errorImg}
            alt="article image"
            className={styles.cardImg}
          />
        </Grid>
        <Grid className={styles.cardContent}>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body1" className={styles.content}>{content}</Typography>
          <Button type="button" className={styles.showMoreBtn}>
            <Link to={`/post/${documentId}`} size="small">
              {t("posts.ShowMore")}
            </Link>
            <Checkbox
              {...label}
              icon={<FavoriteBorder sx={{ color: "red" }} />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </Button>
          <Divider />
        </Grid>
        <Typography variant="subtitle1" className={styles.publishedAt}>
          {t("postId.Published")}: {new Date(publishedAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">{author}</Typography>
      </Box>
    </Container>
  );
}
export default HomeArticles;
