import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CalendarToday from "@material-ui/icons/CalendarToday"
import Email from "@material-ui/icons/Email"
import Lock from "@material-ui/icons/Lock"
import Person from "@material-ui/icons/Person"
import { Field, FieldAttributes, Form, Formik, FormikHelpers, useField, useFormikContext } from "formik"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "src/firebase"
import { FormikContext } from "src/store/contexts/FormikContext"
import * as yup from "yup"

import FullLogo from "../../../images/gods_vision_church_logo.svg"
import { resetPassword, signIn, signUp } from "../../../store/actions/authActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { AuthTypes, CELL_UNASSIGNED_ID, IResetPassword, ISignIn, ISignUp } from "../../../types"
import { ContainerMain } from "../../Level1/Containers/ContainerMain"
import { AlertDialog } from "../../Level1/Dialogs/AlertDialog"
import { SignInAndResetPasswordForm } from "./SignInAndResetPasswordForm"
import { SignUpForm } from "./SignUpForm"
import { emailSignIn, emailSignUp, getPartialAuthValidationSchema } from "./validationSchema"

const useStyles = makeStyles<Theme, { signUpMode: boolean }>((theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    grid: {
      flex: 1,
    },

    signInUpButton: {
      textTransform: "none",
    },
    logo: (props) =>
      props.signUpMode
        ? {
            flex: 1,
            height: theme.spacing(4),
            margin: theme.spacing(5),
          }
        : {
            flex: 1,
            width: "60%",
          },
    footer: {
      bottom: 0,
    },
    buttonWrapper: {
      position: "relative",
      padding: 0,
    },
    progress: {
      color: theme.palette.secondary.light,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -24,
      marginLeft: -24,
      zIndex: 1,
    },
  })
)

const resetPasswordValidationSchema = yup.object<Partial<IResetPassword>>({
  email: emailSignIn,
})

// const signInValidationSchema = yup.object<Partial<ISignIn>>({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// })

const signInValidationSchema = yup.object<Partial<ISignIn>>({
  email: emailSignIn,
  ...getPartialAuthValidationSchema(["password"]),
})

const signUpValidationSchema1: yup.ObjectSchemaDefinition<Partial<ISignUp>> = {
  email: emailSignUp,
  ...getPartialAuthValidationSchema([
    "password",
    "nameKor",
    "nameEng",
    "dob",
    "gender",
    "phoneNumber",
  ]),
}

const signUpValidationSchema2: yup.ObjectSchemaDefinition<Partial<ISignUp>> = {
  ...signUpValidationSchema1,
  ...getPartialAuthValidationSchema([
    "faithStart",
    "londonPurpose",
    "occupation",
  ]),
}

const signUpValidationSchema3: yup.ObjectSchemaDefinition<Partial<ISignUp>> = {
  ...signUpValidationSchema2,
  ...getPartialAuthValidationSchema(["agreeTAndC"]),
}

const signUpValidationSchema = (activeStep: number) =>
  yup.object<Partial<ISignUp>>(
    [signUpValidationSchema1, signUpValidationSchema2, signUpValidationSchema3][
      activeStep
    ]
  )

export const initialValues: AuthTypes = {
  email: "",
  password: "",
  nameKor: "",
  nameEng: "",
  cell: CELL_UNASSIGNED_ID,
  cellRequest: CELL_UNASSIGNED_ID,
  dob: null,
  gender: null,
  phoneNumber: "",
  kakaoId: "",
  previousChurch: "",
  previousVolunteering: "",
  faithStart: "",
  londonPurpose: "",
  occupation: "",
  howDidYouHearInternet: false,
  howDidYouHearIntroduced: "",
  howDidYouHearOther: "",
  serviceFeedback: "",
  rememberMe: false,
  agreeTAndC: false,
  photoUrl: "",
}

export type AuthMode = "signIn" | "signUp" | "resetPassword"

export const AuthPage: FC = () => {
  const dispatch = useDispatch()
  const fbFeedback = useSelector<AppState, AppState["auth"]>(
    (state) => state.auth
  )
  const [authMode, setAuthMode] = useState<AuthMode>("signIn")
  const [activeStep, setActiveStep] = useState(0)
  const [alertResetPassword, setAlertResetPassword] = useState(false)
  const [alertSignUp, setAlertSignUp] = useState(false)

  const classes = useStyles({ signUpMode: authMode === "signUp" })

  const onSubmit = (
    authFormValues: AuthTypes,
    { setSubmitting, setFieldValue }: FormikHelpers<AuthTypes>
  ) => {
    const openAlertResetPassword = () => setAlertResetPassword(true)
    const openAlertSignUp = () => setAlertSignUp(true)

    switch (authMode) {
      case "signIn":
        dispatch(signIn(authFormValues, setSubmitting))
        break

      case "signUp":
        if (activeStep < 2) {
          setSubmitting(false)
          setActiveStep(activeStep + 1)
        } else {
          dispatch(signUp(authFormValues, setSubmitting, openAlertSignUp))
        }
        break

      case "resetPassword":
        dispatch(
          resetPassword(authFormValues, setSubmitting, openAlertResetPassword)
        )
        break
    }
  }

  const validationSchema = () => {
    switch (authMode) {
      case "signIn":
        return signInValidationSchema
      case "signUp":
        return signUpValidationSchema(activeStep)
      case "resetPassword":
        return resetPasswordValidationSchema
    }
  }

  return (
    <Fragment>
      <Formik<AuthTypes>
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema()}
        onSubmit={onSubmit}
      >
        {({ values, errors, isValid, dirty, isSubmitting, submitForm }) => (
          <Form>
            <ContainerMain>
              <div className={classes.root}>
                <img src={FullLogo} alt="GVC" className={classes.logo} />
                <div className={classes.grid}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="center"
                  >
                    <FormikContext.Provider
                      value={{
                        textField: { variant: "outlined", fullWidth: true },
                        datePicker: {
                          inputVariant: "outlined",
                          fullWidth: true,
                        },
                        select: {
                          variant: "outlined",
                        },
                      }}
                    >
                      {authMode === "signUp" ? (
                        <SignUpForm
                          activeStep={activeStep}
                          onNext={submitForm}
                          onBack={() => {
                            if (activeStep > 0) setActiveStep(activeStep - 1)
                          }}
                        />
                      ) : (
                        <SignInAndResetPasswordForm
                          authMode={authMode}
                          onForgotPassword={() => setAuthMode("resetPassword")}
                        />
                      )}
                    </FormikContext.Provider>
                    {(authMode !== "signUp" || activeStep === 2) && (
                      <Grid item xs={12}>
                        <FormControl
                          required
                          error={
                            authMode === "signIn"
                              ? !!fbFeedback.signInError
                              : authMode === "signUp"
                              ? !!fbFeedback.signUpError
                              : !!fbFeedback.resetPasswordError
                          }
                          component="fieldset"
                          fullWidth
                        >
                          <div className={classes.buttonWrapper}>
                            <Button
                              className={classes.signInUpButton}
                              disableElevation
                              color="primary"
                              variant="contained"
                              fullWidth
                              disabled={isSubmitting}
                              type="submit"
                            >
                              <Typography>
                                {authMode === "signIn" && "Sign in"}
                                {authMode === "signUp" && "Sign up"}
                                {authMode === "resetPassword" &&
                                  "Email me reset password link"}
                              </Typography>
                            </Button>
                            {isSubmitting && (
                              <CircularProgress
                                size={48}
                                className={classes.progress}
                              />
                            )}
                          </div>
                          <FormHelperText>
                            {authMode === "signIn" &&
                              fbFeedback.signInError?.message}
                            {authMode === "signUp" &&
                              fbFeedback.signUpError?.message}
                            {authMode === "resetPassword" &&
                              (fbFeedback.resetPasswordError
                                ? fbFeedback.resetPasswordError?.message
                                : fbFeedback.resetPasswordSuccess)}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    )}

                    <Grid item xs>
                      <Link
                        onClick={() =>
                          setAuthMode(
                            authMode === "signIn" ? "signUp" : "signIn"
                          )
                        }
                        display="block"
                        align="center"
                        variant="body2"
                        color="inherit"
                      >
                        {authMode === "signIn"
                          ? "Not a member? Sign up"
                          : authMode === "signUp"
                          ? "Already a member? Sign in"
                          : "Return to sign in page?"}
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </ContainerMain>
            <AlertDialog
              title="Password reset link sent!"
              content="Password reset link has been sent to your email. Please check your email to reset your password, and then come back to sign in."
              open={alertResetPassword}
              handleClose={() => {
                setAlertResetPassword(false)
                setAuthMode("signIn")
              }}
            />
            <AlertDialog
              title="Sign up successful!"
              content="Please now sign in"
              open={alertSignUp}
              handleClose={() => {
                setAlertSignUp(false)
                setAuthMode("signIn")
              }}
            />
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}
