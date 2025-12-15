// library
import Aos from "aos";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

// utilities
import showSuccessAlert from "@/utilities/showSuccessAlert";
import showErrorAlert from "@/utilities/showErrorAlert";
import {
  showEditConfirm,
  showDeleteConfirm,
} from "@/utilities/showEditDeleteToast";

// style
import styles from "@/pages/editPost/EditPost.module.css";

// services
import { GetPostById, EditPostById, DeletePostById } from "@/services/posts";
import Navbar from "@/components/Navbar";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Stack,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

function EditPost() {
  Aos.init({ duration: 1000 });
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: post, isLoading } = GetPostById(documentId);
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const updateMutation = EditPostById();
  const deleteMutation = DeletePostById();

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setAuthor(post.author || "");
      setContent(post.content || "");
      setUrl(post.url || "");
    }
  }, [post]);

  const editPostHandler = (e) => {
    e.preventDefault();
    showEditConfirm({
      t,
      onConfirm: () => {
        updateMutation.mutate(
          {
            documentId: documentId,
            postData: {
              title,
              author,
              content,
              url,
              modifiedDate: new Date().toISOString(),
            },
          },
          {
            onSuccess: () => {
              showSuccessAlert();
              navigate(`/post/${documentId}`);
            },
            onError: () => {
              showErrorAlert();
            },
          }
        );
      },
    });
  };

  const deletePostHandler = () => {
    showDeleteConfirm({
      t,
      onConfirm: () => {
        deleteMutation.mutate(documentId, {
          onSuccess: () => {
            showSuccessAlert();
            localStorage.removeItem("savedPost");
            navigate("/home");
          },
          onError: showErrorAlert,
        });
      },
    });
  };

  if (isLoading || !post) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className={styles.pageContainer}>
        <Paper elevation={3} className={styles.editorCard} data-aos="fade-up">
          <Box
            component="form"
            onSubmit={editPostHandler}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h4" className={styles.formTitle}>
              {t("editPosts.editPost")}
            </Typography>

            <Grid container className={styles.inputsContainer} spacing={2}>
              <Grid>
                <TextField
                  placeholder={t("posts.title")}
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.inputField}
                />
              </Grid>
              <Grid>
                <TextField
                  placeholder="Author"
                  variant="outlined"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={styles.inputField}
                />
              </Grid>
              <Grid>
                <TextField
                  placeholder={t("editPosts.imageURL")}
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={styles.inputField}
                />
              </Grid>
            </Grid>
            <Grid xs={12}>
              <TextField
                multiline
                minRows={10}
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.contentArea}
                placeholder="Start writing your amazing story here..."
              />
            </Grid>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              className={styles.buttonGroup}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                className={styles.saveBtn}
              >
                {t("editPosts.edit")}
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deletePostHandler}
              >
                {t("editPosts.delete")}
              </Button>

              <Button
                variant="text"
                color="inherit"
                startIcon={<CancelIcon />}
                onClick={() => navigate(`/post/${documentId}`)}
              >
                {t("editPosts.cancel")}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default EditPost;
