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
import * as yup from "yup"

import FullLogo from "../../../images/gods_vision_church_logo.svg"
import { resetPassword, signIn, signUp } from "../../../store/actions/authActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { IAuthForm, IResetPassword, ISignIn, ISignUp } from "../../../types"
import { ChangeSignInUp } from "../../Level1/Buttons/ChangeSignInUp"
import { ContainerMain } from "../../Level1/Containers/ContainerMain"
import { FormikDatePicker } from "../../Level1/DatePickers/FormikDatePicker"
import { AlertDialog } from "../../Level1/Dialogs/AlertDialog"
import { ResetPasswordDialog } from "../../Level1/Dialogs/ResetPasswordDialog"
import { TermsAndConditionsDialog } from "../../Level1/Dialogs/TermsAndConditionsDialog"
import { FormikCheckBox } from "../../Level1/SelectionControls/FormikCheckbox"
import { AuthTextField } from "./AuthTextField"
import { SignUpForm } from "./SignUpForm"

const useStyles = makeStyles((theme: Theme) =>
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
    logo: {
      flex: 1,
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
  email: yup.string().email("Invalid email").required("Email is required"),
})

const signInValidationSchema = yup.object<Partial<ISignIn>>({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const signUpValidationSchema1: yup.ObjectSchemaDefinition<Partial<ISignUp>> = {
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: yup.string().required("Name is required"),
  dob: yup.date().nullable().required("Date of Birth is required"),
  gender: yup.mixed().oneOf(["male", "female"]).required("Gender is required"),
  // phoneNumber: yup.string().required("Phone number is required"),
}

const signUpValidationSchema2: yup.ObjectSchemaDefinition<Partial<ISignUp>> = {
  ...signUpValidationSchema1,
}

const signUpValidationSchema3: yup.ObjectSchemaDefinition<Partial<ISignUp>> = {
  ...signUpValidationSchema2,
  agreeTAndC: yup
    .boolean()
    .required()
    .test({
      name: "readTAndC",
      message: "You must agree with the Terms & Conditions",
      test: (agreeTAndC: boolean) => agreeTAndC,
    }),
}

const signUpValidationSchema = (activeStep: number) =>
  yup.object<Partial<ISignUp>>(
    [signUpValidationSchema1, signUpValidationSchema2, signUpValidationSchema3][
      activeStep
    ]
  )

export const AuthPage: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const fbFeedback = useSelector<AppState, AppState["auth"]>(
    (state) => state.auth
  )
  const [page, setPage] = useState<"signIn" | "signUp" | "resetPassword">(
    "signIn"
  )
  const [activeStep, setActiveStep] = useState(0)
  const [alertResetPassword, setAlertResetPassword] = useState(false)
  const [alertSignUp, setAlertSignUp] = useState(false)

  const initialValues: IAuthForm = {
    email: "",
    password: "",
    name: "",
    dob: null,
    rememberMe: false,
    agreeTAndC: false,
  }

  const onSubmit = (
    authFormValues: IAuthForm,
    { setSubmitting, setFieldValue }: FormikHelpers<IAuthForm>
  ) => {
    const openAlertResetPassword = () => setAlertResetPassword(true)
    const openAlertSignUp = () => setAlertSignUp(true)

    switch (page) {
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
    switch (page) {
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
      <Formik<IAuthForm>
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema()}
        onSubmit={onSubmit}
      >
        {({ values, isValid, dirty, isSubmitting, submitForm }) => (
          <Form className={classes.root}>
            <img src={FullLogo} className={classes.logo} alt="GVC Logo" />
            <div className={classes.grid}>
              <ContainerMain>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <SignUpForm
                      activeStep={activeStep}
                      onNext={submitForm}
                      onBack={() => {
                        if (activeStep > 0) setActiveStep(activeStep - 1)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AuthTextField
                      label="Email Address"
                      placeholder="johnsmith@gmail.com"
                      name="email"
                      icon={<Email />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {page !== "resetPassword" && (
                      <AuthTextField
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        icon={<Lock />}
                      />
                    )}
                  </Grid>

                  {page === "signUp" && (
                    <>
                      <Grid item xs={12}>
                        <AuthTextField
                          label="Name"
                          placeholder="김철수/John Smith"
                          name="name"
                          icon={<Person />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikDatePicker<IAuthForm>
                          label="Date of Birth"
                          placeholder="01/01/2000"
                          name="dob"
                          variant="outlined"
                          icon={<CalendarToday />}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs>
                    {page === "signIn" && (
                      <FormikCheckBox<IAuthForm>
                        name="rememberMe"
                        label="Remember me"
                      />
                    )}
                    {page === "signUp" && (
                      <FormikCheckBox<IAuthForm>
                        name="agreeTAndC"
                        label="I consent to"
                      />
                    )}
                  </Grid>
                  <Grid item>
                    {page === "signIn" && (
                      <Link
                        onClick={() => setPage("resetPassword")}
                        display="block"
                        align="center"
                        variant="caption"
                        color="inherit"
                      >
                        Forgot Password?
                      </Link>
                    )}
                    {page === "signUp" && <TermsAndConditionsDialog />}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      required
                      error={
                        page === "signIn"
                          ? !!fbFeedback.signInError
                          : page === "signUp"
                          ? !!fbFeedback.signUpError
                          : !!fbFeedback.resetPasswordError
                      }
                      component="fieldset"
                      fullWidth
                    >
                      <div className={classes.buttonWrapper}>
                        <Button
                          className={classes.signInUpButton}
                          color="primary"
                          variant="contained"
                          fullWidth
                          disabled={isSubmitting}
                          type="submit"
                        >
                          <Typography>
                            {page === "signIn" && "Sign in"}
                            {page === "signUp" && "Sign up"}
                            {page === "resetPassword" &&
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
                        {page === "signIn" && fbFeedback.signInError?.message}
                        {page === "signUp" && fbFeedback.signUpError?.message}
                        {page === "resetPassword" &&
                          (fbFeedback.resetPasswordError
                            ? fbFeedback.resetPasswordError?.message
                            : fbFeedback.resetPasswordSuccess)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {page === "resetPassword" && (
                    <Grid item xs>
                      <Link
                        onClick={() => setPage("signIn")}
                        display="block"
                        align="center"
                        variant="caption"
                        color="inherit"
                      >
                        Return to sign in page?
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </ContainerMain>
            </div>
            <AlertDialog
              title="Password reset link sent!"
              content="Password reset link has been sent to your email. Please check your email to reset your password, and then come back to sign in."
              open={alertResetPassword}
              handleClose={() => {
                setAlertResetPassword(false)
                setPage("signIn")
              }}
            />
            <AlertDialog
              title="Sign up successful!"
              content="Please now sign in"
              open={alertSignUp}
              handleClose={() => {
                setAlertSignUp(false)
                setPage("signIn")
              }}
            />
            <AppBar position="sticky" className={classes.footer}>
              <ChangeSignInUp
                page={page}
                onClick={() => {
                  setPage(page !== "signUp" ? "signUp" : "signIn")
                }}
              />
            </AppBar>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}
