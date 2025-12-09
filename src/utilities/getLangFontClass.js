// get the language font class based on current i18next language
import i18next from "@/i18n";

// Returns font class, direction, and textAlign based on language
export default function getLangProps(styles) {
  const lang = i18next.language;
  let fontClass = "";
  let direction = "ltr";
  let textAlign = "left";
  if (lang === "fa") {
    fontClass = styles.faFont;
    direction = "rtl";
    textAlign = "right";
  } else if (lang === "en") {
    fontClass = styles.enFont;
  } else if (lang === "ko") {
    fontClass = styles.koFont;
  }
  return { fontClass, direction, textAlign };
}
