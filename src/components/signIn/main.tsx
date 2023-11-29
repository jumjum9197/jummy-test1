import React, { useContext, useRef, useState } from "react";
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
import { RootState } from "../../providers/store";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../utilities/notification";
import ReCAPTCHA from "react-google-recaptcha";


const Main = () => {
 
  const [password, setPassword] = useState(false);
  const sessionDetails = useSelector(
    (state: RootState) => state?.sessionDetails?.sessionDetails
  );
  const recaptcha = useRef();
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const [isSending, setIsSending] = useState(false);
  const [buttonText, setButtonText] = useState("Send");

  const decimalNumber = 17;
  const binaryRepresentation = decimalNumber.toString(2);
  console.log(binaryRepresentation); // Output: "10001"

  const handleShowPassword = () => {
    setPassword(!password);
  };

  const validationSchema = Yup.object().shape({
    Email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    Password: Yup.string().required("Password is required"),
  });

  const handleLogin = () => {
    setIsSending(true);
    setButtonText("Sending...");
    if (
      formik?.values?.Email === sessionDetails?.email &&
      formik?.values?.Password === sessionDetails?.Password
    ) {
      showNotification({
        message: "Sign in Successful",
        type: "success",
      });
      navigate("/sign-up");
    }
    if (
      formik?.values?.Email !== sessionDetails?.email ||
      formik?.values?.Password !== sessionDetails?.Password
    ) {
      showNotification({
        message: "Sign in Failed, incorrect username/password",
        type: "error",
      });
    }

    setTimeout(() => {
      setIsSending(false);
      setButtonText("Send");
      navigate("/sign-in");
    }, 3000);
  };

  const formik = useFormik<FormikValues>({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (values) => {
      handleLogin();
      console.log(values);
    },
    validationSchema: validationSchema,
  });

  // async function submitForm(event :any) {
  //   event.preventDefault();
  //   const captchaValue = ""
  //   if (!captchaValue) {
  //     alert("Please verify the reCAPTCHA!");
  //   } else {
  //     // make form submission
  //     alert("Form submission successful!");
  //   }


  return (
    <main className={styles.container}>
     
      <section className={styles.text}><p>fly with us</p></section>
      
      <section>
        <FormikProvider value={formik}>
     
            <main className={styles.section}>
            
              <section className={styles.formWrapper}>
                <form onSubmit={formik.handleSubmit}>
                  <Field
                    label="Email Address"
                    name="Email"
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
                  <Link to="/forgot-password" className={styles.forgotPassword}>
                    Forgot Password?
                  </Link>
                  <div>
                    <Button
                      type="button"
                      text={buttonText}
                      // disabled = {isLoading}
                      className={styles.button}
                      maxWidth="inherit"
                      onClick={formik.handleSubmit}
                     
                    />
                  </div>
                  <ReCAPTCHA sitekey={"6LepryApAAAAAH4EwZ1iW1crdFBXKkseiq99vfmV"} />
                  <span className={styles.para2}>
                    Don't have an account?{" "}
                    <Link to="/sign-up" className={styles.signUpLink}>
                      {" "}
                      Sign Up
                    </Link>
                  </span>
                </form>
              </section>
            </main>
          </FormikProvider>


      </section>

    </main>
//     <main className={styles.container}>
//       {/* <section className={styles.half}>kjkkjkk</section>
//       <section className={styles.half}> */}
//         <section className={styles.center}>
//           <FormikProvider value={formik}>
//             <main className={styles.section}>
//               {/* //   <div  className={styles.circle}><User className={styles.userIcon}/></div> */}
//               <section className={styles.formWrapper}>
//                 {/* <div>
// //              <Camera />
// //             </div> */}
//                 <form onSubmit={formik.handleSubmit}>
//                   <Field
//                     label="Email Address"
//                     name="Email"
//                     as={CustomFormInput}
//                     type="text"
//                     asterisk={false}
//                   />
//                   {/* <Field label="Email Address" name="name" as={CustomFormInput} type="text" asterisk={false} /> */}
//                   <Field
//                     label="Password"
//                     name="Password"
//                     asterisk={false}
//                     as={CustomFormInput}
//                     type={password ? "text" : "password"}
//                     text={
//                       formik?.values?.Password === "" ? (
//                         <></>
//                       ) : password ? (
//                         <OpenEye className="passwordIcon" />
//                       ) : (
//                         <CloseEye className="passwordIcon" />
//                       )
//                     }
//                     handleChangePassword={handleShowPassword}
//                     changePassword={true}
//                   />
//                   <Link to="/forgot-password" className={styles.forgotPassword}>
//                     Forgot Password?
//                   </Link>
//                   <div>
//                     <Button
//                       type="button"
//                       text={buttonText}
//                       // disabled = {isLoading}
//                       className={styles.button}
//                       maxWidth="inherit"
//                       onClick={formik.handleSubmit}
//                     />
//                   </div>
//                   <span className={styles.para2}>
//                     Don't have an account?{" "}
//                     <Link to="/sign-up" className={styles.signUpLink}>
//                       {" "}
//                       Sign Up
//                     </Link>
//                   </span>
//                 </form>
//               </section>
//             </main>
//           </FormikProvider>
//         </section>
//       {/* </section> */}
//     </main>
  );
};
export default Main;
