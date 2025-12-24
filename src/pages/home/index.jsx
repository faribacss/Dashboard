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
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

// services
import { GetAllPost } from "@/services/posts";

// MUI components
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const { data: posts, isLoading } = GetAllPost();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [page, setPage] = useState(1);
  const postPerPage = 3;
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);
  const count = Math.ceil((filteredPosts?.length || 0) / postPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "1300px",
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
                <Loading />
              </Container>
            ) : (
              <Grid container spacing={4} className={styles.postsContainer}>
                {currentPosts?.map((post) => (
                  <Grid key={post.id} className={styles.postItems}>
                    <Card {...post} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Stack
          sx={{
            margin: "50px auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Pagination
            sx={{
              "& .MuiPaginationItem-icon": {
                transform: isRtl ? "rotate(180deg)" : "none",
              },
            }}
            count={count}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="standard"
          />
        </Stack>
      </Box>
    </>
  );
}

export default Home;
