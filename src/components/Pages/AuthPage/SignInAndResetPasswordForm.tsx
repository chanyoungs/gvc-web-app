import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import EmailIcon from "@material-ui/icons/Email"
import LockIcon from "@material-ui/icons/Lock"
import React, { FC, Fragment } from "react"
import { FormikCheckBox } from "src/components/Level1/SelectionControls/FormikCheckbox"
import { ISignIn } from "src/types"

import { AuthMode } from "."
import { AuthTextField } from "./AuthTextField"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface SignInAndResetPasswordFormProps {
  authMode: AuthMode
  onForgotPassword: () => void
}

export const SignInAndResetPasswordForm: FC<SignInAndResetPasswordFormProps> = ({
  authMode,
  onForgotPassword,
}) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Grid item xs={12}>
        <AuthTextField
          textFieldProps={{
            label: "Email Address",
            placeholder: "johnsmith@gmail.com",
            type: "email",
          }}
          name="email"
          icon={<EmailIcon />}
        />
      </Grid>
      {authMode === "signIn" && (
        <Grid item xs={12}>
          <AuthTextField
            textFieldProps={{
              label: "Password",
              placeholder: "Password",
              autoComplete: "current-password",
              type: "password",
            }}
            name="password"
            icon={<LockIcon />}
          />
        </Grid>
      )}
      {authMode === "signIn" && (
        <Fragment>
          <Grid item xs>
            <FormikCheckBox<ISignIn>
              label={<Typography variant="caption">Remember me</Typography>}
              name="rememberMe"
            />
          </Grid>
          <Grid item>
            <Link
              onClick={onForgotPassword}
              display="block"
              align="center"
              variant="caption"
              color="inherit"
            >
              Forgot Password?
            </Link>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  )
}
