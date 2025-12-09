// library
import Aos from "aos";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

// utilities
import showSuccessAlert from "@/utilities/showSuccessAlert";
import showErrorAlert from "@/utilities/showErrorAlert";
import {showEditConfirm , showDeleteConfirm} from "@/utilities/showEditDeleteToast";

// style
import styles from "@/pages/editPost/EditPost.module.css";

// services
import { GetPostById, EditPostById, DeletePostById } from "@/services/posts";
import Navbar from "@/components/Navbar";

function EditPost() {
  Aos.init({ duration: 1000 });
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: post, isLoading } = GetPostById(documentId);
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const updateMutation = EditPostById(documentId);
  const deleteMutation = DeletePostById(documentId);

  useEffect(() => {
    if (post) {
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
          { content, url, modifiedDate: new Date().toISOString() },
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
        deleteMutation.mutate(undefined, {
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
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>Loading...</div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
      <div className={styles.pageContainer}>
        <form
          onSubmit={editPostHandler}
          className={styles.contactUs}
          data-aos="fade-right"
        >
          <h2 className={styles.formTitle}>{t("editPosts.editPost")}</h2>

          <input
            type="text"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            placeholder={t("posts.title")}
          />

          <textarea
            className={styles.textarea}
            onChange={(e) => setContent(e.target.value)}
            name="content"
            value={content}
            required
            placeholder={t("editPosts.content")}
          ></textarea>

          <input
            type="url"
            className={styles.input}
            onChange={(e) => setUrl(e.target.value)}
            name="url"
            value={url}
            placeholder={t("editPosts.imageURL")}
          />
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setWriter(e.target.value)}
            name="author"
            value={writer}
            placeholder="writer"
          />

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              ✓ {t("editPosts.edit")}
            </button>

            <button
              type="button"
              onClick={deletePostHandler}
              className={`${styles.button} ${styles.buttonDelete}`}
            >
              {t("editPosts.delete")} ✗
            </button>

            <button
              type="button"
              onClick={() => navigate(`/post/${documentId}`)}
              className={`${styles.button} ${styles.buttonCancel}`}
            >
              {t("editPosts.cancel")} ⤺
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPost;
