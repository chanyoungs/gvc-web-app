import { auth } from "src/firebase"
import { AuthTypes, ISignUp } from "src/types"
import { localise } from "src/utils/localisation"
import * as yup from "yup"

const genderOptions: ISignUp["gender"][] = ["male", "female"]

const faithStartOptions: ISignUp["faithStart"][] = [
  "child",
  "elementary",
  "middle",
  "high",
  "youth",
  "recent",
]
const londonPurposeOptions: ISignUp["londonPurpose"][] = [
  "work",
  "workingHoliday",
  "university",
  "language",
  "businessTrip",
  "travel",
]

export const emailSignIn = yup
  .string()
  .email(
    localise({ english: "Invalid email", korean: "이메일이 유효하지 않습니다" })
  )
  .required(
    localise({
      english: "Email is required",
      korean: "이메일은 필수 입력란입니다",
    })
  )
export const emailSignUp = yup
  .string()
  .email(
    localise({ english: "Invalid email", korean: "이메일이 유효하지 않습니다" })
  )
  .required(
    localise({
      english: "Email is required",
      korean: "이메일은 필수 입력란입니다",
    })
  )
  .test(
    "checkEmailAvailability",
    localise({
      english: "This email already exists",
      korean: "이미 등록된 이메일입니다",
    }),
    async (value) => {
      try {
        const result = await auth().fetchSignInMethodsForEmail(value)
        return result.length === 0
      } catch (error) {
        console.error(error)
        return error
      }
    }
  )

export const authValidationSchema: yup.ObjectSchemaDefinition<
  Partial<AuthTypes>
> = {
  password: yup
    .string()
    .min(
      6,
      localise({
        english: "Password must be at least 6 characters",
        korean: "비밀번호는 6글자 이상이여야합니다",
      })
    )
    .required(
      localise({
        english: "Password is required",
        korean: "비밀번호는 필수 입력란입니다",
      })
    ),
  nameKor: yup.string(),
  nameEng: yup.string().required(
    localise({
      english: "Name(English) is required",
      korean: "이름(영문)은 필수 입력란입니다",
    })
  ),
  dob: yup
    .date()
    .nullable()
    .required(
      localise({
        english: "Date of Birth is required",
        korean: "생년월일은 필수 입력란입니다",
      })
    ),
  gender: yup
    .mixed()
    .oneOf(
      genderOptions,
      localise({
        english: "Gender is required",
        korean: "성별은 필수 입력란입니다",
      })
    )
    .required(
      localise({
        english: "Gender is required",
        korean: "성별은 필수 입력란입니다",
      })
    ),
  phoneNumber: yup.string(),
  faithStart: yup
    .mixed()
    .oneOf(faithStartOptions)
    .required(
      localise({ english: "Please select one", korean: "선택을 해주세요" })
    ),
  londonPurpose: yup
    .mixed()
    .oneOf(londonPurposeOptions)
    .required(
      localise({ english: "Please select one", korean: "선택을 해주세요" })
    ),
  occupation: yup.string().required(
    localise({
      english: "Please give details of your occupation",
      korean: "하는 일/공부를 자세희 알려주세요",
    })
  ),
  agreeTAndC: yup
    .boolean()
    .required()
    .test({
      name: "readTAndC",
      message: localise({
        english: "You must agree with the Terms & Conditions",
        korean: "이용 약관에 꼭 동의해야합니다",
      }),
      test: (agreeTAndC: boolean) => agreeTAndC,
    }),
}

export const getPartialAuthValidationSchema = (
  keys: (keyof Partial<AuthTypes>)[]
): yup.ObjectSchemaDefinition<Partial<AuthTypes>> =>
  keys.reduce(
    (output, key) => ({ [key]: authValidationSchema[key], ...output }),
    {}
  )
