// library
import { useTranslation } from "react-i18next";
import { useContext } from "react";

// style
import styles from "@/components/Footer/Footer.module.css";

// MUI components
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";

// utilities
import getLangProps from "@/utilities/getLangFontClass";

// context
import { SaveInfoContext } from "@/context/SaveInfo";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: <LinkedInIcon className={styles.icon} />,
    color: "#0077b5",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: <InstagramIcon className={styles.icon} />,
    color: "#E4405F",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: <YouTubeIcon className={styles.icon} />,
    color: "#FF0000",
  },
  {
    name: "Telegram",
    url: "https://t.me/",
    icon: <TelegramIcon className={styles.icon} />,
    color: "#229ED9",
  },
  {
    name: "GitHub",
    url: "https://github.com/",
    icon: <GitHubIcon className={styles.icon} />,
    color: "#181717",
  },
];

export default function Footer() {
  const { jwt } = useContext(SaveInfoContext) || {};
  const { fontClass: langFontClass } = getLangProps(styles);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return (
    <>
      {jwt ? (
        <>
          <footer className={styles.footer}>
            <div
              className={`${styles.container} ${langFontClass} ${
                isRtl ? styles.rtl : ""
              }`}
            >
              <div className={styles.brand}>
                <span className={styles.logo}>{t("footer.BlogPage")}</span>
                <span className={styles.slogan}>{t("footer.description")}</span>
              </div>
              <div className={styles.socials}>
                {socialLinks.map(({ name, url, icon, color }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={styles.socialLink}
                    style={{ "--icon-hover-color": color }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div className={`${styles.copyright} ${langFontClass}`}>
              {t("footer.rights")} {new Date().getFullYear()}
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
}
