// library
import { Link, useParams } from "react-router-dom";
import Aos from "aos";
import { useTranslation } from "react-i18next";

// services
import { GetPostById } from "@/services/posts";

// style
import styles from "@/pages/postId/PostId.module.css";

// image import
import errorImg from "@/assets/public/img/notFound.png";
import Navbar from "@/components/Navbar";

function PostId() {
  Aos.init({ duration: 1000 });

  const { documentId } = useParams();
  const { t } = useTranslation();
  const { data: post, isLoading } = GetPostById(documentId);

  const isEdited =
    post &&
    post.updatedAt &&
    post.publishedAt &&
    post.title &&
    post.author &&
    new Date(post.updatedAt).getTime() !== new Date(post.publishedAt).getTime();

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "red",
        }}
      >
        {t("Post not found")}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.postLayout}>
        <div className={styles.stickySideBar} data-aos="fade-right">
          <img
            src={post.url || errorImg}
            alt="post image"
            className={styles.postImage}
          />
          <div className={styles.postInfo}>
            <div className={styles.avatarWrapper}>
              <div className={styles.imageContainer}>
                <div className={styles.avatar}>
                  {post.author ? post.author.charAt(0).toUpperCase() : "?"}
                </div>
              </div>
            </div>
            <div className={styles.metaText}>
              <h4 className={styles.publishDate}>
                {new Date(post.publishedAt).toLocaleDateString()}
              </h4>
            </div>
            <div className={styles.buttonGroup}>
              <Link to={`/edit-post/${documentId}`} className={styles.btn}>
                {t("postId.EditPost")}
              </Link>
              <Link to="/home" className={styles.btn}>
                {t("postId.BacktoHome")}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.postContent} data-aos="fade-up">
          <div className={styles.contentHeader}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.metaData}>
              <span className={styles.authorTag}>
                {t("postId.Author")}: <strong>{post.author}</strong>
              </span>
              {isEdited && (
                <span className={styles.editTag}>
                  {t("postId.EditedPost")}:{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className={styles.postBody}>
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default PostId;
