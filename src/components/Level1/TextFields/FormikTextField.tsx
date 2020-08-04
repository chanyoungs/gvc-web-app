import InputAdornment from "@material-ui/core/InputAdornment"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import { FieldAttributes, useField } from "formik"
import React, { FC } from "react"
import { IAuthForm } from "src/types"

export const FormikTextField: FC<
  FieldAttributes<{}> &
    TextFieldProps & { icon: JSX.Element; name: keyof IAuthForm }
> = ({ label, type, placeholder, icon, ...props }) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      type={type}
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
      fullWidth
      InputProps={{
        // className: classes.input,
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  )
}
