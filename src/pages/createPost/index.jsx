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
  const createPost = CreateOnePost();
  const [formData, setFormData] = useState({
    // title: "",
    content: "",
    url: "",
    modifiedDate: new Date().toISOString(),
    // author: "",
  });
  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const addPost = (e) => {
    e.preventDefault();
    createPost.mutate(formData, {
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
              <CreateIcon color="primary" fontSize="large" />
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
                {/* <Stack direction="row" gap={2}>
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
                </Stack> */}
                <Stack direction="row" gap={1} spacing={2} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon style={{ margin: "0 8px" }} />}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    }}
                  >
                    {t("posts.CreatePost")}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    size="large"
                    endIcon={<CancelIcon style={{ margin: "0 8px" }} />}
                    onClick={() => navigate("/home")}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
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
