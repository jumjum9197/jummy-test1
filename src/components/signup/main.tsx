import React, { useContext, useEffect, useState } from "react";
import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Camera from "../camera/camera";
import styles from "./main.module.scss";
import { Input } from "@mui/material";
import CustomFormInput from "../custom/input/formInput";
import { ReactComponent as OpenEye } from "../svg/openEye.svg";
import { ReactComponent as CloseEye } from "../svg/closeEye.svg";
import { ReactComponent as User } from "../svg/user.svg";
import Button from "../custom/button/button";
import { NotificationContext } from "../../utilities/notification";
import { SessionDetails, updateSession } from "../../reduxSlice/sessionSlice";
import { AppDispatch, RootState } from "../../providers/store";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [buttonText, setButtonText] = useState("Send");
  const { showNotification } = useContext(NotificationContext);
  const sessionDetails = useSelector((state: RootState) => state?.sessionDetails?.sessionDetails);

  const navigate = useNavigate();

  
  const dispatch: AppDispatch = useDispatch();
  
  const handleShowPassword = () => {
    setPassword(!password);
  };
  const handleShowConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };


  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.number()
      .required("Phone No is required")
      .typeError("number only is required"),
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    Password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,

        "Password must match the following "
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("Password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      email: "",
      Password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },

    onSubmit: (values) => {
      console.log(values);

      dispatch(updateSession(formik?.values as SessionDetails));
      handleClick();

    },
    validationSchema: validationSchema,
  });
  const handleClick = () => {
    setIsSending(true);
    setButtonText("Sending...");
    showNotification({
      message: "Registration Successful",
      type: "success",
    });
 
    setTimeout(() => {
      setIsSending(false);
      setButtonText("Send");
      navigate("/sign-in");
    }, 3000);
  };

  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState("");

  useEffect(() => {
    handlePassword(formik?.values?.Password);
  }, [formik?.values?.Password]);

  const handlePassword = (passwordValue: any) => {
    const strengthChecks = {
      length: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length =
      formik?.values?.Password?.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length === 5
        ? "Strong"
        : verifiedList.length >= 2
        ? "Medium"
        : "Weak";

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);

    console.log(message, "mess");
    console.log("verifiedList: ", `${(verifiedList.length / 5) * 100}%`);
  };

  const getActiveColor = (type: any) => {
    if (type === "Strong") return "#8BC926";
    if (type === "Medium") return "#FEBD01";
    return "#FF0054";
  };

  return (
    <FormikProvider value={formik}>
      <main className={styles.section}>
        <div className={styles.circle}>
          <User className={styles.userIcon} />
        </div>
        <section className={styles.formWrapper}>
          {/* <div>
          <Camera />
        </div> */}
          <form onSubmit={formik.handleSubmit}>
            <Field
              label="First Name"
              name="firstName"
              as={CustomFormInput}
              type="text"
              asterisk={false}
            />
            <Field
              label="Last Name"
              name="lastName"
              as={CustomFormInput}
              type="text"
              asterisk={false}
            />
            <Field
              label="Email"
              name="email"
              as={CustomFormInput}
              type="text"
              asterisk={false}
            />
            <Field
              label="Phone Number"
              name="phoneNumber"
              as={CustomFormInput}
              type="text"
              asterisk={false}
            />
            <Field
              label="Password"
              name="Password"
              asterisk={false}
              as={CustomFormInput}
              type={password ? "text" : "password"}
              text={
                formik?.values?.Password === "" ? (
                  <></>
                ) : password ? (
                  <OpenEye className="passwordIcon" />
                ) : (
                  <CloseEye className="passwordIcon" />
                )
              }
              handleChangePassword={handleShowPassword}
              changePassword={true}
            />

            <div className="progress-bg">
              <div
                className="progress"
                style={{
                  width: progress,
                  backgroundColor: getActiveColor(message),
                }}
              ></div>
            </div>
            {formik?.values?.Password.length !== 0 ? (
              <p className="message" style={{ color: getActiveColor(message) }}>
                Your password is {message}
              </p>
            ) : null}
            <Field
              label="Confirm Password"
              name="confirmPassword"
              asterisk={false}
              as={CustomFormInput}
              type={confirmPassword ? "text" : "password"}
              text={
                formik?.values?.confirmPassword === "" ? (
                  <></>
                ) : confirmPassword ? (
                  <OpenEye className="passwordIcon" />
                ) : (
                  <CloseEye className="passwordIcon" />
                )
              }
              handleChangePassword={handleShowConfirmPassword}
              changePassword={true}
            />
            <div>
              <Button
                type="button"
                text={buttonText}
                // disabled = {isLoading}
                className={styles.button}
                maxWidth="inherit"
                onClick={formik.handleSubmit}
                // onClick={handleClick}
              />
            </div>
            <span className={styles.para2}>
              Already have an account?{" "}
              <Link to="/sign-in" className={styles.signUpLink}>
                {" "}
                Sign In
              </Link>
            </span>
          </form>
        </section>
      </main>
    </FormikProvider>
  );
};
export default Main;

