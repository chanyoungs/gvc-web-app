import InputAdornment from "@material-ui/core/InputAdornment"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import { FieldAttributes, useField } from "formik"
import React, { useContext } from "react"
import { FormikContext } from "src/store/contexts/FormikContext"

export type FormikTextFieldProps<Form> = FieldAttributes<{}> & {
  textFieldProps: TextFieldProps
  icon?: JSX.Element
  name: keyof Form
}

function FormikTextField<Form>({
  textFieldProps,
  icon,
  ...fieldProps
}: FormikTextFieldProps<Form>) {
  const [field, meta] = useField(fieldProps)
  const errorText = meta.error && meta.touched ? meta.error : ""
  const formikContext = useContext(FormikContext)
  const textFieldContext = formikContext.textField
    ? formikContext.textField
    : {}
  return (
    <TextField
      {...field}
      {...({
        ...textFieldContext,
        ...textFieldProps,
      } as TextFieldProps)}
      helperText={errorText}
      error={!!errorText}
      InputProps={{
        ...textFieldContext.InputProps,
        endAdornment: icon && (
          <InputAdornment position="end">{icon}</InputAdornment>
        ),
      }}
    />
  )
}

export { FormikTextField }

// export const FormikTextField: FC<
//   FieldAttributes<{}> &
//     TextFieldProps & { icon?: JSX.Element; name: keyof IAuthForm }
// > = ({ label, type, placeholder, variant, icon, ...props }) => {
//   const [field, meta] = useField<{}>(props)
//   const errorText = meta.error && meta.touched ? meta.error : ""
//   return (
//     <TextField
//       {...field}
//       label={label}
//       placeholder={placeholder}
//       type={type}
//       helperText={errorText}
//       error={!!errorText}
//       variant={variant as any} // TODO: Typescript limitation
//       fullWidth
//       InputProps={
//         icon
//           ? {
//               endAdornment: (
//                 <InputAdornment position="end">{icon}</InputAdornment>
//               ),
//             }
//           : {}
//       }
//     />
//   )
// }
