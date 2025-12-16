// library
import { useTranslation } from "react-i18next";
import { useState } from "react";

// styles
import styles from "@/pages/home/Home.module.css";
import "@/pages/home/Homestyle.scss";

// swiper styles
import "swiper/css";
import "swiper/css/navigation";

// components
import HomeArticles from "@/components/homeArticles";
import Navbar from "@/components/Navbar";

// services
import { GetAllPost } from "@/services/posts";

// MUI components
import { Box, Container, Grid, TextField, Typography } from "@mui/material";

function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const { data: posts, isLoading } = GetAllPost();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = posts?.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {isRtl ? (
          <>
            <div className="sun4"></div>
            <div className="sun5"></div>
            <div className="sun6"></div>
          </>
        ) : (
          <>
            <div className="sun"></div>
            <div className="sun2"></div>
            <div className="sun3"></div>
          </>
        )}
        <Grid container className={styles.gridContainer} spacing={1}>
          <Grid sx={{ mx: "auto" }}>
            <h1 className={styles.HeaderTitle}>{t("posts.description")}</h1>
            <TextField
              className={styles.searchBox}
              onChange={handleSearchChange}
              placeholder={t("panel.searchPosts")}
              type="search"
              fullWidth
            />
          </Grid>

          <Grid className={styles.postsItemsContainer}>
            {isLoading ? (
              <Container
                className="dots-container"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography>Loading ...</Typography>
              </Container>
            ) : (
              <Grid container spacing={4} className={styles.postsContainer}>
                {filteredPosts?.map((post) => (
                  <Grid
                    xs={12}
                    md={3}
                    lg={3}
                    key={post.id}
                    className={styles.postItems}
                  >
                    <HomeArticles {...post} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
