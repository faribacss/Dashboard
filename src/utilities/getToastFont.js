// i18n.js
import i18next from "@/i18n";

export function getToastFont() {
  const isRtl = i18next.dir() === "rtl";
  const lang = (i18next.language || "").split("-")[0];
  let fontFamily;
  if (lang === "fa") {
    fontFamily = "Lalezar";
  } else if (lang === "ko") {
    fontFamily = "JejuMyeongjo";
  } else {
    fontFamily = "BricolageBold";
  }

  return { fontFamily, isRtl, lang };
}
