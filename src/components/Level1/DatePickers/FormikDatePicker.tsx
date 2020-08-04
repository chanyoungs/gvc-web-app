import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { DatePicker } from "@material-ui/pickers"
import { FieldAttributes, useField, useFormikContext } from "formik"
import React, { FC } from "react"
import { IAuthForm } from "src/types"

export const FormikDatePicker: FC<
  FieldAttributes<{}> & {
    label: string
    name: keyof IAuthForm
  } & {
    icon: JSX.Element
  }
> = ({ label, placeholder, icon, ...props }) => {
  const [field, meta] = useField<{}>(props)
  const { setFieldValue } = useFormikContext()
  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <DatePicker
      {...field}
      label={label}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      disableFuture
      openTo="year"
      format="dd/MM/yyyy"
      views={["year", "month", "date"]}
      fullWidth
      inputVariant="outlined"
      onChange={(val) => {
        setFieldValue(field.name, val)
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  )
}
