// library
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Aos from "aos";

// services
import CreateOnePost from "@/services/posts";

// utilities
import showSuccessAlert from "@/utilities/showSuccessAlert";
import showErrorAlert from "@/utilities/showErrorAlert";

// style
import styles from "@/pages/createPost/CreatePost.module.css";

// MUI components
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ImageLinkIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Navbar from "@/components/Navbar";

export default function CreatePost() {
  Aos.init({ duration: 1000 });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate } = CreateOnePost();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    url: "",
    modifiedDate: new Date().toISOString(),
  });
  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const addPost = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        showSuccessAlert(t("alerts.PostCreatedSuccessfully"));
        navigate("/home");
      },
      onError: () => {
        showErrorAlert(t("alerts.ErrorCreatingPost"));
      },
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
          <h1 className={styles.createPostTitle}>{t("createPost.desc")}</h1>
        <Box className={styles.createPostPage} data-aos="fade-down">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              width: "100%",
              borderRadius: 4,
              background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
              <CreateIcon fontSize="large" sx={{ color: "#A9C455" }} />
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                {t("posts.CreateNewPost")}
              </Typography>
            </Box>
            <form onSubmit={addPost}>
              <Stack spacing={3}>
                <TextField
                  id="content"
                  name="content"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={formData.content}
                  onChange={formHandler}
                  required
                  placeholder={t("posts.Write")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  id="url"
                  name="url"
                  placeholder={t("posts.ImageURL")}
                  type="url"
                  variant="outlined"
                  fullWidth
                  value={formData.url}
                  onChange={formHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageLinkIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Stack direction="row" gap={2}>
                  <TextField
                    id="title"
                    name="title"
                    multiline
                    rows={1}
                    fullWidth
                    variant="outlined"
                    value={formData.title}
                    onChange={formHandler}
                    required
                    placeholder={t("posts.title")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        width: "100%",
                      },
                    }}
                  />
                  <TextField
                    id="author"
                    name="author"
                    placeholder={t("posts.author")}
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.author}
                    onChange={formHandler}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        width: "100%",
                      },
                    }}
                  />
                </Stack>
                <Stack className={styles.btnContainer}>
                  <Button
                    className={styles.createPostButton1}
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={
                      <SendIcon
                        className={styles.createPostButtonIcon}
                      />
                    }
                  >
                    {t("posts.CreatePost")}
                  </Button>
                  <Button
                    className={styles.createPostButton2}
                    type="button"
                    variant="outlined"
                    size="large"
                    endIcon={
                      <CancelIcon
                        className={styles.createPostButtonIcon}
                      />
                    }
                    onClick={() => navigate("/home")}
                  >
                    {t("posts.Cancel")}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
