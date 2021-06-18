import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import EmailIcon from "@material-ui/icons/Email"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import GroupIcon from "@material-ui/icons/Group"
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
import { localise } from "src/utils/localisation"

import { AuthCheckboxTextField } from "./AuthCheckboxTextField"
import { FormikCellSelection } from "./FormikCellSelection"

const SignUpStepsTitles = [
  localise({ english: "Basic Info", korean: "기본 정보" }),
  localise({ english: "Additional Info", korean: "추가 정보" }),
  localise({ english: "For Reference", korean: "참고 사항" }),
]

export const SignUpSteps = SignUpStepsTitles.map(
  (title, index) => `${index + 1}. ${title}`
)

const faithStartMenuItems: { value: ISignUp["faithStart"]; label: string }[] = [
  { value: "child", label: localise({ english: "Child", korean: "유아" }) },
  {
    value: "elementary",
    label: localise({ english: "Elementary School", korean: "초등학생" }),
  },
  {
    value: "middle",
    label: localise({ english: "Middle School", korean: "중학생" }),
  },
  {
    value: "high",
    label: localise({ english: "High School", korean: "고등학생" }),
  },
  { value: "youth", label: localise({ english: "Youth", korean: "청년" }) },
  { value: "recent", label: localise({ english: "Recently", korean: "최근" }) },
]

const londonPurposeMenuItems: {
  value: ISignUp["londonPurpose"]
  label: string
}[] = [
  { value: "work", label: localise({ english: "Work", korean: "직장인" }) },
  {
    value: "workingHoliday",
    label: localise({ english: "Working Holiday", korean: "워킹홀리데이" }),
  },
  {
    value: "university",
    label: localise({
      english: "University/College/School",
      korean: "학교/대학/대학원",
    }),
  },
  {
    value: "language",
    label: localise({ english: "English Language Study", korean: "어학" }),
  },
  {
    value: "businessTrip",
    label: localise({ english: "Business Trip", korean: "출장" }),
  },
  { value: "travel", label: localise({ english: "Travel", korean: "여행" }) },
]

export const SignUpFields = (
  keysToRemove: (keyof Partial<AuthTypes>)[] = []
): {
  [key in keyof Partial<AuthTypes>]: JSX.Element
}[] => {
  const fullSignUpFields = [
    {
      email: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({ english: "Email Address*", korean: "이메일*" }),
            placeholder: "johnsmith@gmail.com",
            type: "email",
          }}
          name="email"
          icon={<EmailIcon />}
        />
      ),
      password: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({ english: "Password*", korean: "비밀번호*" }),
            placeholder: localise({
              english: "Password",
              korean: "비밀번호",
            }),
            autoComplete: "current-password",
            type: "password",
          }}
          name="password"
          icon={<LockIcon />}
        />
      ),
      nameKor: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({ english: "Name(Korean)", korean: "이름(한글)" }),
            placeholder: "김철수",
          }}
          name="nameKor"
          icon={<PersonIcon />}
        />
      ),
      nameEng: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({
              english: "Name(English)*",
              korean: "이름(영문)*",
            }),
            placeholder: "Chulsoo Kim",
          }}
          name="nameEng"
          icon={<PersonIcon />}
        />
      ),
      dob: (
        <FormikDatePicker<ISignUp>
          label={localise({ english: "Date of Birth*", korean: "생년월일" })}
          placeholder="01/01/2000"
          name="dob"
          icon={<CalendarTodayIcon />}
        />
      ),
      cell: (
        <FormikCellSelection<ISignUp>
          textFieldProps={{
            label: localise({ english: "Cell", korean: "셀" }),
          }}
          name="cell"
          icon={<GroupIcon />}
        />
      ),
      cellRequest: (
        <FormikCellSelection<ISignUp>
          textFieldProps={{
            label: localise({ english: "Cell Request", korean: "셀 요청" }),
          }}
          name="cellRequest"
          icon={<GroupIcon />}
        />
      ),
      gender: (
        <FormikRadio<ISignUp, ISignUp["gender"]>
          name="gender"
          radios={[
            {
              value: "male",
              label: localise({ english: "Male", korean: "남자" }),
            },
            {
              value: "female",
              label: localise({ english: "Female", korean: "여자" }),
            },
          ]}
        />
      ),
      phoneNumber: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({ english: "Phone Number", korean: "핸드폰 번호" }),
            placeholder: "+44771234567",
          }}
          name="phoneNumber"
          icon={<PhoneIcon />}
        />
      ),
      kakaoId: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({
              english: "Kakaotalk ID",
              korean: "카카오 아이디",
            }),
            placeholder: "kakaoid123",
          }}
          name="kakaoId"
          icon={<CustomIcon src={KakaoIcon} alt="K" />}
        />
      ),
    },
    {
      previousChurch: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({
              english: "Previous Church",
              korean: "이전 교회",
            }),
            placeholder: localise({
              english: "Previous Church",
              korean: "이전 교회",
            }),
          }}
          name="previousChurch"
          icon={<CustomIcon src={ChurchIcon} alt="C" />}
        />
      ),
      previousVolunteering: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({
              english: "Previous Volunteering",
              korean: "이전 사역",
            }),
            placeholder: localise({
              english: "e.g. Worship team",
              korean: "예: 찬양팀",
            }),
          }}
          name="previousVolunteering"
          icon={<EmojiPeopleIcon />}
        />
      ),
      faithStart: (
        <FormikSelect<ISignUp, ISignUp["faithStart"]>
          label={localise({
            english: "When did you come to have faith?",
            korean: "신앙을 갖게된 시기",
          })}
          name="faithStart"
          menuItems={faithStartMenuItems}
        />
      ),
      londonPurpose: (
        <FormikSelect<ISignUp, ISignUp["londonPurpose"]>
          label={localise({
            english: "Purpose of your stay in London",
            korean: "런던 체류 목적",
          })}
          name="londonPurpose"
          menuItems={londonPurposeMenuItems}
        />
      ),
      occupation: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({
              english: "Occupation Details*",
              korean: "현제 직업/공부 자세한 설명",
            }),
            placeholder: localise({
              english: "e.g. Company/School, Job/Course",
              korean: "예: 회사/학교, 직책/전공",
            }),
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
          label={localise({
            english: "Internet: Naver, Google, Daum...",
            korean: "인터넷: 네이버, 구글, 다움...",
          })}
          groupLabel={localise({
            english: "How did you hear about us?",
            korean: "교회에 대해서 어디서 들으셨나요?",
          })}
          name="howDidYouHearInternet"
        />
      ),
      howDidYouHearIntroduced: (
        <AuthCheckboxTextField
          label={localise({
            english: "Introduced by...",
            korean: "소개해준분 성함...",
          })}
          placeholder={localise({
            english: "Who introduced you?",
            korean: "누가 소개 해주셨나요?",
          })}
          name="howDidYouHearIntroduced"
        />
      ),
      howDidYouHearOther: (
        <AuthCheckboxTextField
          label={localise({ english: "Other", korean: "기타" })}
          placeholder={localise({
            english: "How did you hear us?",
            korean: "교회에 대해서 어디서 들어셨나요?",
          })}
          name="howDidYouHearOther"
        />
      ),
      serviceFeedback: (
        <FormikTextField<ISignUp>
          textFieldProps={{
            label: localise({
              english: "Service Feedback",
              korean: "예배 피드백",
            }),
            placeholder: localise({
              english: "How was the church service?",
              korean: "예배가 어떠셨나요?",
            }),
            multiline: true,
            rows: 4,
            rowsMax: 6,
          }}
          name="serviceFeedback"
        />
      ),
      agreeTAndC: (
        <Grid container alignItems="center">
          <Grid item xs>
            <FormikCheckbox<ISignUp>
              label={
                <Typography variant="caption">
                  {localise({
                    english: "I consent to",
                    korean: "이용 약관에 동의합니다",
                  })}
                </Typography>
              }
              name="agreeTAndC"
            />
          </Grid>
          <Grid item>
            <TermsAndConditionsDialog />
          </Grid>
        </Grid>
      ),
    },
  ]

  return fullSignUpFields.map((step) => {
    let filteredFields: { [key in keyof Partial<AuthTypes>]: JSX.Element } = {}
    Object.keys(step).forEach((key) => {
      if (!keysToRemove.includes(key as keyof AuthTypes))
        filteredFields = {
          ...filteredFields,
          [key as keyof Partial<AuthTypes>]: step[key as keyof typeof step],
        }
    })
    return filteredFields
  })
}
