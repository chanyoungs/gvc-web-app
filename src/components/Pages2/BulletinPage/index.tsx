import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPBulletinPage {}

export interface ISBulletinPage {}

export interface IBibleVerseRef {
  book: number
  chapter: number
  verse: number
}
export interface IBulletin {
  date: string
  preacher: string
  praise: string
  choir: string
  readings: [IBibleVerseRef, IBibleVerseRef][]
  sermon: string
  offeringHymn: string
  notices: string
  blessing: string
  benediction: string
}

// const validationSchema = yup.object<Partial<IAuthForm>>({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().when("page", {
//     is: (page) => page === "signIn" || page === "signUp",
//     then: yup
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   }),
//   name: yup.string().when("page", {
//     is: "signUp",
//     then: yup.string().required("Name is required"),
//   }),
//   dob: yup
//     .date()
//     .nullable()
//     .when("page", {
//       is: "signUp",
//       then: yup.date().nullable().required("Date of Birth is required"),
//     }),
//   agreeTAndC: yup.boolean().when("page", {
//     is: "signUp",
//     then: yup
//       .boolean()
//       .required()
//       .test({
//         name: "readTAndC",
//         message: "You must agree with the Terms & Conditions",
//         test: (agreeTAndC: boolean) => agreeTAndC,
//       }),
//   }),
// })

// export interface Props {}

// export const AuthPage: FC = () => {
//   const classes = useStyles()
//   const dispatch = useDispatch()
//   const fbFeedback = useSelector<AppState, AppState["auth"]>(
//     (state) => state.auth
//   )

//   const initialValues: IAuthForm = {
//     email: "",
//     password: "",
//     name: "",
//     dob: null,
//     rememberMe: false,
//     agreeTAndC: false,
//     page: "signIn",
//     alertResetPassword: false,
//     alertSignUp: false,
//   }

//   const onSubmit = (
//     values: IAuthForm,
//     { setSubmitting, setFieldValue }: FormikHelpers<IAuthForm>
//   ) => {
//     const { email, password, name, dob, rememberMe, agreeTAndC, page } = values

//     const openAlertResetPassword = () =>
//       setFieldValue("alertResetPassword", true)
//     const openAlertSignUp = () => setFieldValue("alertSignUp", true)

//     switch (page) {
//       case "signIn":
//         dispatch(
//           signIn({
//             email,
//             password,
//             rememberMe,
//             setSubmitting,
//           })
//         )
//         break

//       case "signUp":
//         dispatch(
//           signUp({
//             email,
//             password,
//             name,
//             dob,
//             agreeTAndC,
//             setSubmitting,
//             openAlert: openAlertSignUp,
//           })
//         )
//         break

//       case "resetPassword":
//         dispatch(
//           resetPassword({
//             email,
//             setSubmitting,
//             openAlert: openAlertResetPassword,
//           })
//         )
//         break
//     }
//   }

//   return (
//     <Fragment>
//       <Formik<IAuthForm>
//         validateOnChange
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {({ values, isValid, dirty, isSubmitting, setFieldValue }) => (
//           <Form className={classes.root}>

export const BulletinPage: FC<IPBulletinPage> = (props) => {
  const classes = useStyles()
  const [values, setValues] = useState<ISBulletinPage>({})

  return (
    <Fragment>
      <AppBarMain title="Bulletin" />
      <ContainerMain>주보</ContainerMain>
    </Fragment>
  )
}
