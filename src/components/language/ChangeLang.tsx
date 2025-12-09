// Library
import { useContext, useState, type JSX } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import { LanguageContext } from "@/context/LanguageContext.tsx";

// Style
import style from "@/components/language/ChangeLang.module.css";

// images
import EnglishFlag from "@/assets/public/img/English.png";
import IranFlag from "@/assets/public/img/Farsi.png";
import KoreaFlag from "@/assets/public/img/korea.png";

// icon
import PublicIcon from "@mui/icons-material/Public";
import { useTranslation } from "react-i18next";

function ChangeLang(): JSX.Element {
  // states
  const [open, setOpen] = useState<boolean>(false);
  const { language: selectedLang, changeLanguage } =
    useContext(LanguageContext);
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  const direction = isFa ? "rtl" : "ltr";

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  // change app language via context and close dropdown
  const selectLanguage = (lang: string) => {
    changeLanguage(lang);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={style.langBox} sx={{ direction: direction, left: isFa ? "90px" : "auto", top: isFa ? "35px" : "35px", right: isFa ? "auto" : "90px" }}>
        <button
          type="button"
          onClick={handleClick}
          className={style.langButton}
        >
          {selectedLang ? (
            <img
              src={
                selectedLang.startsWith("fa")
                  ? IranFlag
                  : selectedLang.startsWith("ko")
                  ? KoreaFlag
                  : EnglishFlag
              }
              alt={selectedLang}
              className={style.flagImage}
            />
          ) : (
            <PublicIcon />
          )}
        </button>
        {open ? (
          <Box className={style.langDropdown}>
            <ul className={style.langList}>
              <li>
                <img
                  src={EnglishFlag}
                  alt="English"
                  className={style.flagImage}
                  onClick={() => selectLanguage("en")}
                />
              </li>
              <li>
                <img
                  src={IranFlag}
                  alt="فارسی"
                  className={style.flagImage}
                  onClick={() => selectLanguage("fa")}
                />
              </li>
              <li>
                <img
                  src={KoreaFlag}
                  alt="한국어"
                  className={style.flagImage}
                  onClick={() => selectLanguage("ko")}
                />
              </li>
            </ul>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
export default ChangeLang;
