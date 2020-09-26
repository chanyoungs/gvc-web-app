import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Icon from "@material-ui/core/Icon"
import MobileStepper from "@material-ui/core/MobileStepper"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon"
import Typography from "@material-ui/core/Typography"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import EmailIcon from "@material-ui/icons/Email"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import LockIcon from "@material-ui/icons/Lock"
import PersonIcon from "@material-ui/icons/Person"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { FC, Fragment, useState } from "react"
import { FormikDatePicker } from "src/components/Level1/DatePickers/FormikDatePicker"
import { FormikRadio } from "src/components/Level1/Radios/FormikRadio"
import KakaoIcon from "src/images/kakaotalk.svg"
import { AuthTypes, ISignUp } from "src/types"

import { AuthTextField } from "./AuthTextField"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { flexGrow: 1 },
    stepper: { flexGrow: 1 },
    icon: { textAlign: "center" },
    img: { height: "100%" },
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
            label="Email Address*"
            placeholder="johnsmith@gmail.com"
            name="email"
            icon={<EmailIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <AuthTextField
            label="Password*"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            icon={<LockIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <AuthTextField
            label="Name*"
            placeholder="김철수/John Smith"
            name="name"
            icon={<PersonIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikDatePicker<ISignUp>
            label="Date of Birth*"
            placeholder="01/01/2000"
            name="dob"
            variant="outlined"
            icon={<CalendarTodayIcon />}
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
        <Grid item xs={12}>
          <AuthTextField
            label="Phone Number*"
            placeholder="+44771234567"
            name="phoneNumber"
            icon={<PhoneIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <AuthTextField
            label="Kakaotalk ID"
            placeholder="kakaoid123"
            name="kakaoId"
            icon={
              <Icon className={classes.icon}>
                <img src={KakaoIcon} alt="K" className={classes.img} />
              </Icon>
            }
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
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={onBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRightIcon />
            ) : (
              <KeyboardArrowLeftIcon />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}
