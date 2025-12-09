// library
import { useContext} from "react";
import { SaveInfoContext } from "@/context/SaveInfo";
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

  const { user } = useContext(SaveInfoContext);
  const { documentId } = useParams();
  const { t } = useTranslation();
  const { data: post, isLoading } = GetPostById(documentId);

  const isEdited =
    post &&
    post.updatedAt &&
    post.publishedAt &&
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

  return (
    <>
    <Navbar />
      <div className={styles.card}>
        <div className={styles.cardContainer} data-aos="fade-up">
          <div className={styles.upperContainer}>
            <img
              src={post.url || errorImg}
              alt="post image"
              className={styles.postImage}
            />
          </div>
          <div className={styles.avatarWrapper}>
            <div className={styles.imageContainer}>
              <div className={styles.avatar}>
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <div className={styles.lowerContainer}>
            <div>
              <h3>{user.username}</h3>
              <h4>
                {t("postId.Published")}:{" "}
                {new Date(post.publishedAt).toLocaleDateString()}
              </h4>
            </div>
            <div>
              <p>{post.content}</p>
              {isEdited ? (
                <h4>
                  {t("postId.EditedPost")}:{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </h4>
              ) : null}
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
      </div>
    </>
  );
}
export default PostId;
