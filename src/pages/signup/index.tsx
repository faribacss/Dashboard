// Library
import { useState, useContext, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Context
import { SaveInfoContext } from "@/context/SaveInfo";
import ChangeLang from "@/components/language/ChangeLang";

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
// import SocialLoginButtons from "@/component/SocialLoginButtons";

// Utilities (Alert)
import showErrorAlert from "@/utilities/showErrorAlert";
import showSuccessAlert from "@/utilities/showSuccessAlert";

// CSS Module Styles
import styles from "@/pages/signup/Signup.module.css";

// Validation schema builder (pure function, safe to call at module scope)
export const buildSignUpSchema = (t) =>
  yup.object().shape({
    username: yup
      .string()
      .required(t("signupErrorMessages.usernameRequired"))
      .min(3, t("signupErrorMessages.usernameMin"))
      .matches(
        /^[A-Za-z\u0600-\u06FF\uAC00-\uD7AF0-9][A-Za-z\u0600-\u06FF\uAC00-\uD7AF0-9._@$-]*$/u,
        t("signupErrorMessages.usernameMatches")
      ),
    email: yup
      .string()
      .required(t("signupErrorMessages.emailRequired"))
      .email(t("signupErrorMessages.emailMessage")),
    password: yup
      .string()
      .required(t("signupErrorMessages.passwordRequired"))
      .min(6, t("signupErrorMessages.passwordMin"))
      .max(20, t("signupErrorMessages.passwordMax"))
      .matches(
        /^[a-zA-Z0-9][a-zA-Z0-9._@$-]*$/,
        t("signupErrorMessages.passwordMatches")
      ),
  });

function SignUpPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.language?.startsWith("fa");
  // create memoized schema inside the component (valid hook usage)
  const signUpSchema = useMemo(() => buildSignUpSchema(t), [t, i18n?.language]);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm({ resolver: yupResolver(signUpSchema), mode: "onBlur" });

  useEffect(() => {
    if (Object.keys(errors || {}).length) {
      trigger();
    }
  }, [i18n?.language]);

  // watch fields so we can enable submit only when both are filled
  const [usernameValue, emailValue, passwordValue] = watch([
    "username",
    "email",
    "password",
  ]);
  const allFilled = Boolean(usernameValue && passwordValue && emailValue);

  // state and context
  const { register: registerUser } = useContext(SaveInfoContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checkPolicy, setCheckPolicy] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const user = await registerUser(data);
      setIsSuccess(true);
      showSuccessAlert("signUp");

      // Clear form fields and reset all states for New Registration
      reset({ username: "", email: "", password: "" });
      setCheckPolicy(false);

      // Navigate after short delay to show success state
      setTimeout(() => {
        navigate("/panel");
      }, 1500);

      return user;
    } catch (error) {
      console.error(" Registration error:", error);
      // error message from API
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An unexpected error occurred during registration";

      showErrorAlert("signUp", errorMessage);
    }
  };
  const handlePolicyChange = (e) => {
    setCheckPolicy(e.target.checked);
  };
  return (
    <div className={styles.mainContainer}>
      <ChangeLang />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent={{ xs: "center", md: "center" }}
      >
        <Grid className={styles.container}>
          <Box component="section">
            <Typography
              component="h4"
              variant="h4"
              gutterBottom
              className={`auth-title ${styles.title}`}
            >
              {t("signup.title")}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleRegister)}
              noValidate
            >
              <Grid container spacing={2} direction="column">
                <Grid>
                  <TextField
                    required
                    fullWidth
                    {...register("username")}
                    placeholder={t("signup.usernameLabel")}
                    type="text"
                    className="auth-text-field"
                    variant="outlined"
                    color="success"
                    autoComplete="new-username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputLabelProps={{
                      style: {
                        width: "100%",
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
                    type="email"
                    {...register("email")}
                    placeholder={t("signup.emailLabel")}
                    className="auth-text-field"
                    variant="outlined"
                    color="success"
                    autoComplete="new-email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputLabelProps={{
                      style: {
                        width: "100%",
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
                    placeholder={t("signup.passwordLabel")}
                    className="auth-text-field"
                    variant="outlined"
                    color="success"
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputLabelProps={{
                      style: {
                        width: "100%",
                        textAlign: isRtl ? "right" : "left",
                        direction: isRtl ? "rtl" : "ltr",
                      },
                    }}
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
                          checked={checkPolicy}
                          onChange={handlePolicyChange}
                          className="auth-checkBox"
                        />
                      }
                      label={t("signup.policy")}
                      className={styles.policyLabel}
                    />
                  </FormGroup>
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      !checkPolicy || isSubmitting || isSuccess || !allFilled
                    }
                    fullWidth
                    className={`auth-button-base ${
                      isSuccess
                        ? "auth-success-button"
                        : checkPolicy
                        ? "auth-primary-button"
                        : "auth-disabled-button"
                    }`}
                  >
                    {isSuccess
                      ? t("signup.button.success")
                      : isSubmitting
                      ? t("signup.button.registering")
                      : t("signup.button.signup")}
                  </Button>
                </Grid>
                {/* <Grid>
              <Typography variant="body2" className="auth-or-text">
                Or
              </Typography>
            </Grid>
            <Grid>
              <SocialLoginButtons/>
            </Grid> */}
              </Grid>
            </Box>
            <Typography className="auth-bottom-text">
              {t("signup.haveAccount")}{" "}
              <Link to="/" className="auth-link">
                {t("signup.login")}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box component="div" className="auth-image-box" />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpPage;
