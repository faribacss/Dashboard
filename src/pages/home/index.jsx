// library
import { useTranslation } from "react-i18next";

// styles
import styles from "@/pages/home/Home.module.css";
import "swiper/css";
import "swiper/css/navigation";

// components
import HomeArticles from "@/components/homeArticles";

// services
import { GetAllPost } from "@/services/posts";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Navbar from "@/components/Navbar";

function Home() {
  const { t } = useTranslation();
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
      <Box sx={{maxWidth: "1400px", margin: "0 auto", padding: "20px"}}>
        <Grid container className={styles.gridContainer}>
          {/* <div className={styles.homeInfo}>
          <h4>{t("posts.description")}</h4>
        </div> */}
          <Grid size={{md: 4, xs: 6}} className={styles.searchContainer}>
            <TextField
              className={styles.searchBox}
              onChange={handleSearchChange}
              placeholder={t("panel.searchPosts")}
              type="search"
            />
          </Grid>
          <Grid size={12} className={styles.postsItemsContainer}>
            {isLoading ? (
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "bisque",
                }}
              >
                Loading ...
              </Typography>
            ) : (
              <Box className={styles.postsContainer}>
                {filteredPosts?.map((post) => (
                  <Box className={styles.postItems} key={post.id}>
                    <HomeArticles {...post} />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
