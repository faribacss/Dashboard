// library
import { t } from "i18next";
import { toast, Bounce } from "react-toastify";

// utilities
import { getToastFont } from "@/utilities/getToastFont";

function showSuccessAlert(type = "default") {
  const titleMessage = () => {
    switch (type) {
      case "login":
        return t("alerts.loginSuccess");
      case "signUp":
        return t("alerts.signupSuccess");
      default:
        return t("alerts.defaultSuccess");
    }
  };
  const { fontFamily, isRtl } = getToastFont();

  return toast.success(titleMessage(), {
    position: isRtl ? "top-left" : "top-right",
    autoClose: 5000,
    rtl: isRtl,
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
export default showSuccessAlert;
