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
import {
  Field,
  FieldAttributes,
  Form,
  Formik,
  FormikHelpers,
  useField,
  useFormikContext,
} from "formik"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation } from "react-router-dom"
import * as yup from "yup"

import FullLogo from "../../images/gods_vision_church_logo.svg"
import { resetPassword, signIn, signUp } from "../../store/actions/authActions"
import { AppState } from "../../store/reducers/rootReducer"
import { IAuthForm } from "../../types"
import { ChangeSignInUp } from "../Level1/Buttons/ChangeSignInUp"
import { ContainerMain } from "../Level1/Containers/ContainerMain"
import { FormikDatePicker } from "../Level1/DatePickers/FormikDatePicker"
import { AlertDialog } from "../Level1/Dialogs/AlertDialog"
import { ResetPasswordDialog } from "../Level1/Dialogs/ResetPasswordDialog"
import { TermsAndConditionsDialog } from "../Level1/Dialogs/TermsAndConditionsDialog"
import MyLink from "../Level1/Links/MyLink"
import { FormikCheckBox } from "../Level1/SelectionControls/FormikCheckbox"
import { FormikTextField } from "../Level1/TextFields/FormikTextField"

// import Container from "@material-ui/core/Container"
// import { updateStyle } from "../../store/actions/styleActions"
// import DateOfBirthTextField from "../Level1/TextFields/DateOfBirthTextField"
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
      // paddingLeft: theme.spacing(6),
      // paddingRight: theme.spacing(6),
      // paddingBottom: theme.spacing(5),
    },

    signInUpButton: {
      textTransform: "none",
    },
    logo: {
      flex: 1,
      // width: theme.spacing(10),
      // marginTop: theme.spacing(10),
      // marginBottom: theme.spacing(5),
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

const validationSchema = yup.object<Partial<IAuthForm>>({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().when("page", {
    is: (page) => page === "signIn" || page === "signUp",
    then: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),
  name: yup.string().when("page", {
    is: "signUp",
    then: yup.string().required("Name is required"),
  }),
  dob: yup
    .date()
    .nullable()
    .when("page", {
      is: "signUp",
      then: yup.date().nullable().required("Date of Birth is required"),
    }),
  agreeTAndC: yup.boolean().when("page", {
    is: "signUp",
    then: yup
      .boolean()
      .required()
      .test({
        name: "readTAndC",
        message: "You must agree with the Terms & Conditions",
        test: (agreeTAndC: boolean) => agreeTAndC,
      }),
  }),
})

export interface Props {}

export const AuthPage: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const fbFeedback = useSelector<AppState, AppState["auth"]>(
    (state) => state.auth
  )

  const initialValues: IAuthForm = {
    email: "",
    password: "",
    name: "",
    dob: null,
    rememberMe: false,
    agreeTAndC: false,
    page: "signIn",
    alertResetPassword: false,
    alertSignUp: false,
  }

  const onSubmit = (
    values: IAuthForm,
    { setSubmitting, setFieldValue }: FormikHelpers<IAuthForm>
  ) => {
    const { email, password, name, dob, rememberMe, agreeTAndC, page } = values

    const openAlertResetPassword = () =>
      setFieldValue("alertResetPassword", true)
    const openAlertSignUp = () => setFieldValue("alertSignUp", true)

    switch (page) {
      case "signIn":
        dispatch(
          signIn({
            email,
            password,
            rememberMe,
            setSubmitting,
          })
        )
        break

      case "signUp":
        dispatch(
          signUp({
            email,
            password,
            name,
            dob,
            agreeTAndC,
            setSubmitting,
            openAlert: openAlertSignUp,
          })
        )
        break

      case "resetPassword":
        dispatch(
          resetPassword({
            email,
            setSubmitting,
            openAlert: openAlertResetPassword,
          })
        )
        break
    }
  }

  return (
    <Fragment>
      <Formik<IAuthForm>
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, isValid, dirty, isSubmitting, setFieldValue }) => (
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
                    <FormikTextField
                      label="Email Address"
                      placeholder="johnsmith@gmail.com"
                      name="email"
                      icon={<Email />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {values.page !== "resetPassword" && (
                      <FormikTextField
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        icon={<Lock />}
                      />
                    )}
                  </Grid>

                  {values.page === "signUp" && (
                    <>
                      <Grid item xs={12}>
                        <FormikTextField
                          label="Name"
                          placeholder="김철수/John Smith"
                          name="name"
                          icon={<Person />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikDatePicker
                          label="Date of Birth"
                          placeholder="01/01/2000"
                          name="dob"
                          icon={<CalendarToday />}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs>
                    {values.page === "signIn" && (
                      <FormikCheckBox name="rememberMe" label="Remember me" />
                    )}
                    {values.page === "signUp" && (
                      <FormikCheckBox name="agreeTAndC" label="I consent to" />
                    )}
                  </Grid>
                  <Grid item>
                    {values.page === "signIn" && (
                      <Link
                        onClick={() => setFieldValue("page", "resetPassword")}
                        display="block"
                        align="center"
                        variant="caption"
                        color="inherit"
                      >
                        Forgot Password?
                      </Link>
                    )}
                    {values.page === "signUp" && <TermsAndConditionsDialog />}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      required
                      error={
                        values.page === "signIn"
                          ? !!fbFeedback.signInError
                          : values.page === "signUp"
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
                            {values.page === "signIn" && "Sign in"}
                            {values.page === "signUp" && "Sign up"}
                            {values.page === "resetPassword" &&
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
                        {values.page === "signIn" &&
                          fbFeedback.signInError?.message}
                        {values.page === "signUp" &&
                          fbFeedback.signUpError?.message}
                        {values.page === "resetPassword" &&
                          (fbFeedback.resetPasswordError
                            ? fbFeedback.resetPasswordError?.message
                            : fbFeedback.resetPasswordSuccess)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {values.page === "resetPassword" && (
                    <Grid item xs>
                      <Link
                        onClick={() => setFieldValue("page", "signIn")}
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
              open={values.alertResetPassword}
              handleClose={() => {
                setFieldValue("alertResetPassword", false)
                setFieldValue("page", "signIn")
              }}
            />
            <AlertDialog
              title="Sign up successful!"
              content="Please now sign in"
              open={values.alertSignUp}
              handleClose={() => {
                setFieldValue("alertSignUp", false)
                setFieldValue("page", "signIn")
              }}
            />
            <AppBar position="sticky" className={classes.footer}>
              <ChangeSignInUp
                page={values.page}
                onClick={() => {
                  values.page !== "signUp"
                    ? setFieldValue("page", "signUp")
                    : setFieldValue("page", "signIn")
                }}
              />
            </AppBar>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}
