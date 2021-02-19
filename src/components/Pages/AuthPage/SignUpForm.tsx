import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import MobileStepper from "@material-ui/core/MobileStepper"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import EmailIcon from "@material-ui/icons/Email"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import LockIcon from "@material-ui/icons/Lock"
import PersonIcon from "@material-ui/icons/Person"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { FC, Fragment } from "react"
import { FormikDatePicker } from "src/components/Level1/DatePickers/FormikDatePicker"
import { TermsAndConditionsDialog } from "src/components/Level1/Dialogs/TermsAndConditionsDialog"
import { CustomIcon } from "src/components/Level1/Icons/CustomIcon"
import { FormikRadio } from "src/components/Level1/Radios/FormikRadio"
import { FormikSelect } from "src/components/Level1/Select/FormikSelect"
import { FormikCheckBox } from "src/components/Level1/SelectionControls/FormikCheckbox"
import { FormikTextField } from "src/components/Level1/TextFields/FormikTextField"
import ChurchIcon from "src/images/church.svg"
import KakaoIcon from "src/images/kakaotalk.svg"
import { AuthTypes, ISignUp } from "src/types"

import { AuthCheckboxTextField } from "./AuthCheckboxTextField"
import { SignUpFields, SignUpSteps } from "./SignUpFields"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
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
        return "1. Basic Info"
      case 1:
        return "2. Additional Info"
      case 2:
        return "3. For Reference"
      default:
        return "Error"
    }
  }

  const field = () => {
    switch (activeStep) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Email Address*",
                  placeholder: "johnsmith@gmail.com",
                  type: "email",
                }}
                name="email"
                icon={<EmailIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Password*",
                  placeholder: "Password",
                  autoComplete: "current-password",
                  type: "password",
                }}
                name="password"
                icon={<LockIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Name*",
                  placeholder: "김철수/John Smith",
                }}
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
              <FormikRadio<ISignUp, ISignUp["gender"]>
                name="gender"
                radios={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Phone Number*",
                  placeholder: "+44771234567",
                }}
                name="phoneNumber"
                icon={<PhoneIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Kakaotalk ID",
                  placeholder: "kakaoid123",
                }}
                name="kakaoId"
                icon={<CustomIcon src={KakaoIcon} alt="K" />}
              />
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Previous Church",
                  placeholder: "Previous Church",
                }}
                name="previousChurch"
                icon={<CustomIcon src={ChurchIcon} alt="C" />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Previous Volunteering",
                  placeholder: "e.g. Media team",
                }}
                name="previousVolunteering"
                icon={<EmojiPeopleIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikSelect<ISignUp, ISignUp["faithStart"]>
                label="When did you come to have faith?"
                name="faithStart"
                variant="outlined"
                menuItems={[
                  { value: "child", label: "Child" },
                  { value: "elementary", label: "Elementary School" },
                  { value: "middle", label: "Middle School" },
                  { value: "high", label: "High School" },
                  { value: "youth", label: "Youth" },
                  { value: "recent", label: "Recently" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikSelect<ISignUp, ISignUp["londonPurpose"]>
                label="Purpose of your stay in London"
                name="londonPurpose"
                variant="outlined"
                menuItems={[
                  { value: "work", label: "Work" },
                  { value: "workingHoliday", label: "Working Holiday" },
                  { value: "university", label: "University/College/School" },
                  { value: "language", label: "English Language Study" },
                  { value: "businessTrip", label: "Business Trip" },
                  { value: "travel", label: "Travel" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Occupation Details*",
                  placeholder: "e.g. Company/School, Job/Course",
                  multiline: true,
                  rows: 2,
                  rowsMax: 4,
                }}
                name="occupation"
              />
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment>
            <Grid item xs={12}>
              <FormikCheckBox<ISignUp>
                label="Internet: Naver, Google, Daum..."
                groupLabel="How did you hear about us?"
                name="howDidYouHearInternet"
              />
              <AuthCheckboxTextField
                label="Introduced by..."
                placeholder="Who introduced you?"
                name="howDidYouHearIntroduced"
              />
              <AuthCheckboxTextField
                label="Other"
                placeholder="How did you hear us?"
                name="howDidYouHearOther"
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                textFieldProps={{
                  label: "Service Feedback",
                  placeholder: "How was the church service?",
                  multiline: true,
                  rows: 4,
                  rowsMax: 6,
                }}
                name="serviceFeedback"
              />
            </Grid>
            <Grid item xs>
              <FormikCheckBox<ISignUp>
                label={<Typography variant="caption">I consent to</Typography>}
                name="agreeTAndC"
              />
            </Grid>
            <Grid item>
              <TermsAndConditionsDialog />
            </Grid>
          </Fragment>
        )
      default:
        return "Error"
    }
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold" m={1}>
            {SignUpSteps[activeStep]}
          </Box>
        </Typography>
      </Grid>
      {Object.keys(SignUpFields[activeStep]).map((key) => (
        <Grid item xs={12} key={key}>
          {SignUpFields[activeStep][key as keyof Partial<AuthTypes>]}
        </Grid>
      ))}
      {/* {field()} */}
      <Grid item xs={12}>
        <MobileStepper
          variant="progress"
          steps={4}
          position="static"
          activeStep={activeStep + 1}
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
      </Grid>
    </Fragment>
  )
}
