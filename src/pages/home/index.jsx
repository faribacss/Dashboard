// library
import { useTranslation } from "react-i18next";
// import styled from "styled-components";

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
      <Box sx={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
        <Grid container className={styles.gridContainer} spacing={3}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            sx={{ mx: "auto", mt: 3, mb: 3 }}
          >
            <TextField
              className={styles.searchBox}
              onChange={handleSearchChange}
              placeholder={t("panel.searchPosts")}
              type="search"
              fullWidth
            />
          </Grid>

          <Grid Container className={styles.postsItemsContainer}>
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
                  <Grid key={post.id} className={styles.postItems}>
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
