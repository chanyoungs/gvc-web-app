import { auth } from "src/firebase"
import { AuthTypes, ISignUp } from "src/types"
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
  .email("Invalid email")
  .required("Email is required")
export const emailSignUp = yup
  .string()
  .email("Invalid email")
  .required("Email is required")
  .test(
    "checkEmailAvailability",
    "This email already exists",
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
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  nameKor: yup.string(),
  nameEng: yup.string().required("Name(English) is required"),
  dob: yup.date().nullable().required("Date of Birth is required"),
  gender: yup
    .mixed()
    .oneOf(genderOptions, "Gender is required")
    .required("Gender is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  faithStart: yup
    .mixed()
    .oneOf(faithStartOptions)
    .required("Please select one"),
  londonPurpose: yup
    .mixed()
    .oneOf(londonPurposeOptions)
    .required("Please select one"),
  occupation: yup.string().required("Please give details of your occupation"),
  agreeTAndC: yup
    .boolean()
    .required()
    .test({
      name: "readTAndC",
      message: "You must agree with the Terms & Conditions",
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
