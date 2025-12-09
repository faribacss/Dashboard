// library
import { t } from "i18next";
import { toast, Bounce } from "react-toastify";
import { getToastFont } from "@/utilities/getToastFont";

function showErrorAlert(type = "default", customMessage = null) {
  const titleMessage = () => {
    if (customMessage) {
      return t("alerts.customMessage");
    }
    switch (type) {
      case "login":
        return t("alerts.loginError");
      case "signUp":
        return t("alerts.signupError");
      default:
        return t("alerts.defaultError");
    }
  };

  const { fontFamily, isRtl } = getToastFont();

  return toast.error(titleMessage(), {
    position: isRtl ? "top-left" : "top-right",
    rtl: isRtl,
    autoClose: 5000,
    style: { fontFamily: fontFamily, fontSize: "18px" },
    className: "custom-swal",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    theme: "light",
  });
}

export default showErrorAlert;
