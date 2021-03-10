import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import EmailIcon from "@material-ui/icons/Email"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import LockIcon from "@material-ui/icons/Lock"
import PersonIcon from "@material-ui/icons/Person"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { Fragment } from "react"
import { FormikDatePicker } from "src/components/Level1/DatePickers/FormikDatePicker"
import { TermsAndConditionsDialog } from "src/components/Level1/Dialogs/TermsAndConditionsDialog"
import { CustomIcon } from "src/components/Level1/Icons/CustomIcon"
import { FormikRadio } from "src/components/Level1/Radios/FormikRadio"
import { FormikSelect } from "src/components/Level1/Select/FormikSelect"
import { FormikCheckbox } from "src/components/Level1/SelectionControls/FormikCheckbox"
import { FormikTextField } from "src/components/Level1/TextFields/FormikTextField"
import ChurchIcon from "src/images/church.svg"
import KakaoIcon from "src/images/kakaotalk.svg"
import { AuthTypes, ISignUp } from "src/types"

import { AuthCheckboxTextField } from "./AuthCheckboxTextField"

export const SignUpSteps = [
  "1. Basic Info",
  "2. Additional Info",
  "3. For Reference",
]

const faithStartMenuItems: { value: ISignUp["faithStart"]; label: string }[] = [
  { value: "child", label: "Child" },
  { value: "elementary", label: "Elementary School" },
  { value: "middle", label: "Middle School" },
  { value: "high", label: "High School" },
  { value: "youth", label: "Youth" },
  { value: "recent", label: "Recently" },
]

const londonPurposeMenuItems: {
  value: ISignUp["londonPurpose"]
  label: string
}[] = [
  { value: "work", label: "Work" },
  { value: "workingHoliday", label: "Working Holiday" },
  { value: "university", label: "University/College/School" },
  { value: "language", label: "English Language Study" },
  { value: "businessTrip", label: "Business Trip" },
  { value: "travel", label: "Travel" },
]

export const SignUpFields: {
  [key in keyof Partial<AuthTypes>]: JSX.Element
}[] = [
  {
    email: (
      <FormikTextField
        textFieldProps={{
          label: "Email Address*",
          placeholder: "johnsmith@gmail.com",
          type: "email",
        }}
        name="email"
        icon={<EmailIcon />}
      />
    ),
    password: (
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
    ),
    name: (
      <FormikTextField
        textFieldProps={{
          label: "Name*",
          placeholder: "김철수/John Smith",
        }}
        name="name"
        icon={<PersonIcon />}
      />
    ),
    dob: (
      <FormikDatePicker<ISignUp>
        label="Date of Birth*"
        placeholder="01/01/2000"
        name="dob"
        icon={<CalendarTodayIcon />}
      />
    ),
    gender: (
      <FormikRadio<ISignUp, ISignUp["gender"]>
        name="gender"
        radios={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
      />
    ),
    phoneNumber: (
      <FormikTextField
        textFieldProps={{
          label: "Phone Number*",
          placeholder: "+44771234567",
        }}
        name="phoneNumber"
        icon={<PhoneIcon />}
      />
    ),
    kakaoId: (
      <FormikTextField
        textFieldProps={{
          label: "Kakaotalk ID",
          placeholder: "kakaoid123",
        }}
        name="kakaoId"
        icon={<CustomIcon src={KakaoIcon} alt="K" />}
      />
    ),
  },
  {
    previousChurch: (
      <FormikTextField
        textFieldProps={{
          label: "Previous Church",
          placeholder: "Previous Church",
        }}
        name="previousChurch"
        icon={<CustomIcon src={ChurchIcon} alt="C" />}
      />
    ),
    previousVolunteering: (
      <FormikTextField
        textFieldProps={{
          label: "Previous Volunteering",
          placeholder: "e.g. Media team",
        }}
        name="previousVolunteering"
        icon={<EmojiPeopleIcon />}
      />
    ),
    faithStart: (
      <FormikSelect<ISignUp, ISignUp["faithStart"]>
        label="When did you come to have faith?"
        name="faithStart"
        menuItems={faithStartMenuItems}
      />
    ),
    londonPurpose: (
      <FormikSelect<ISignUp, ISignUp["londonPurpose"]>
        label="Purpose of your stay in London"
        name="londonPurpose"
        menuItems={londonPurposeMenuItems}
      />
    ),
    occupation: (
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
    ),
  },
  {
    howDidYouHearInternet: (
      <FormikCheckbox<ISignUp>
        label="Internet: Naver, Google, Daum..."
        groupLabel="How did you hear about us?"
        name="howDidYouHearInternet"
      />
    ),
    howDidYouHearIntroduced: (
      <AuthCheckboxTextField
        label="Introduced by..."
        placeholder="Who introduced you?"
        name="howDidYouHearIntroduced"
      />
    ),
    howDidYouHearOther: (
      <AuthCheckboxTextField
        label="Other"
        placeholder="How did you hear us?"
        name="howDidYouHearOther"
      />
    ),
    serviceFeedback: (
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
    ),
    agreeTAndC: (
      <Fragment>
        <Grid item xs>
          <FormikCheckbox<ISignUp>
            label={<Typography variant="caption">I consent to</Typography>}
            name="agreeTAndC"
          />
        </Grid>
        <Grid item>
          <TermsAndConditionsDialog />
        </Grid>
      </Fragment>
    ),
  },
]
