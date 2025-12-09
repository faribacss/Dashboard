// Library
import { useState, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Context
import { SaveInfoContext } from "@/context/SaveInfo";

// Components
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShowPassword from "@/components/ShowPassword";
// import SocialLoginButtons from "@/components/SocialLoginButtons";

// CSS Module Styles
import styles from "@/pages/login/Login.module.css";

// Utilities (Alert)
import showErrorAlert from "@/utilities/showErrorAlert";
import showSuccessAlert from "@/utilities/showSuccessAlert";

// Validation schema builder (pure function)
export const buildLoginSchema = (t: any) =>
  yup.object().shape({
    identifier: yup
      .string()
      .required(t("loginErrorMessages.emailRequired"))
      .email(t("loginErrorMessages.emailMessage")),
    password: yup
      .string()
      .required(t("loginErrorMessages.passwordRequired"))
      .min(6, t("loginErrorMessages.passwordMessage")),
  });

function ToLogin() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.language?.startsWith("fa");
  const loginSchema = useMemo(() => buildLoginSchema(t), [t, i18n?.language]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (Object.keys(errors || {}).length) {
      trigger();
    }
  }, [i18n?.language]);

  const [identifierValue, passwordValue] = watch(["identifier", "password"]);
  const allFilled = Boolean(identifierValue && passwordValue);

  // state and context
  const context = useContext(SaveInfoContext);
  if (!context) {
    throw new Error("SaveInfoContext must be used within SaveInfoProvider");
  }
  const { loginUser } = context;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (data: {
    identifier: string;
    password: string;
  }) => {
    try {
      const user = await loginUser({
        identifier: data.identifier,
        password: data.password,
      });
      setIsSuccess(true);
      showSuccessAlert("login");
      // Navigate after short delay to show success state
      setTimeout(() => {
        navigate("/panel");
      }, 1000);

      return user;
    } catch (error: any) {
      // error message from API
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An unexpected error occurred";

      showErrorAlert("login", errorMessage);
      console.error("Login error:", error);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent={{ xs: "center" }}
      >
        <Grid className={styles.container}>
          <Box component="section">
            <Typography variant="h2" gutterBottom className="auth-title">
              {t("login.title")}
            </Typography>
            <Typography variant="subtitle2" className={styles.subtitle}>
              {t("login.subtitle")}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleLogin)}>
              <Grid container spacing={2} direction="column">
                <Grid>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    {...register("identifier")}
                    placeholder={t("login.emailLabel")}
                    className="auth-text-field"
                    variant="outlined"
                    color="success"
                    InputLabelProps={{
                      style: {
                        width: "100%",
                        textAlign: isRtl ? "right" : "left",
                        direction: isRtl ? "rtl" : "ltr",
                      },
                    }}
                    error={!!errors.identifier}
                    helperText={errors.identifier?.message}
                    FormHelperTextProps={{
                      sx: {
                        textAlign: isRtl ? "right" : "left",
                        direction: isRtl ? "rtl" : "ltr",
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder={t("login.passwordLabel")}
                    InputLabelProps={{
                      style: {
                        width: "100%",
                        textAlign: isRtl ? "right" : "left",
                        direction: isRtl ? "rtl" : "ltr",
                      },
                    }}
                    FormHelperTextProps={{
                      sx: {
                        textAlign: isRtl ? "right" : "left",
                        direction: isRtl ? "rtl" : "ltr",
                      },
                    }}
                    className="auth-text-field"
                    variant="outlined"
                    color="success"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <ShowPassword
                          showPassword={showPassword}
                          onToggle={() => setShowPassword(!showPassword)}
                        />
                      ),
                      style: { direction: isRtl ? "rtl" : "ltr" },
                    }}
                  />
                </Grid>
                <Grid>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="success"
                        />
                      }
                      label={t("login.remember")}
                      className={styles.rememberMeLabel}
                    />
                  </FormGroup>
                </Grid>
                <Grid>
                  <Button
                    onClick={handleSubmit(handleLogin)}
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || isSuccess || !allFilled}
                    fullWidth
                    className={`auth-button-base ${
                      isSuccess ? "auth-success-button" : "auth-primary-button"
                    }`}
                  >
                    {isSuccess
                      ? t("login.button.success")
                      : isSubmitting
                      ? t("login.button.signing")
                      : t("login.button.login")}
                  </Button>
                </Grid>
                <Grid>
                  <Typography className="auth-bottom-text">
                    {t("login.noAccount")}{" "}
                    <Link to="/signup" className="auth-link">
                      {t("login.signup")}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid>
          <div className="auth-image-box"></div>
        </Grid>
      </Grid>
    </div>
  );
}
export default ToLogin;
