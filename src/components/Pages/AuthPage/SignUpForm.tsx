import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import MobileStepper from "@material-ui/core/MobileStepper"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CalendarToday from "@material-ui/icons/CalendarToday"
import Email from "@material-ui/icons/Email"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import Lock from "@material-ui/icons/Lock"
import Person from "@material-ui/icons/Person"
import React, { FC, Fragment, useState } from "react"
import { FormikDatePicker } from "src/components/Level1/DatePickers/FormikDatePicker"
import { FormikRadio } from "src/components/Level1/Radios/FormikRadio"
import { IAuthForm, ISignUp } from "src/types"

import { AuthTextField } from "./AuthTextField"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { flexGrow: 1 },
    stepper: { flexGrow: 1 },
  })
)

export interface SignUpFormProps {
  activeStep: number
  onNext: () => void
  onBack: () => void
}

const activeSteps = 2

export const SignUpForm: FC<SignUpFormProps> = ({
  activeStep,
  onNext,
  onBack,
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const title = () => {
    switch (activeStep) {
      case 0:
        return "1. Basic info"
      case 1:
        return "2. Additional info"
      case 2:
        return "3. For reference"
      default:
        return "Error"
    }
  }

  return (
    <div className={classes.root}>
      <Typography>{title()}</Typography>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12}>
          <AuthTextField
            label="Email Address"
            placeholder="johnsmith@gmail.com"
            name="email"
            icon={<Email />}
          />
        </Grid>
        <Grid item xs={12}>
          <AuthTextField
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            icon={<Lock />}
          />
        </Grid>
        <Grid item xs={12}>
          <AuthTextField
            label="Name"
            placeholder="김철수/John Smith"
            name="name"
            icon={<Person />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikDatePicker<ISignUp>
            label="Date of Birth"
            placeholder="01/01/2000"
            name="dob"
            variant="outlined"
            icon={<CalendarToday />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikRadio<ISignUp>
            name="gender"
            radios={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </Grid>
      </Grid>
      <MobileStepper
        variant="progress"
        steps={4}
        position="static"
        activeStep={activeStep + 1}
        className={classes.stepper}
        nextButton={
          <Button
            size="small"
            onClick={onNext}
            disabled={activeStep === activeSteps}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={onBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}
