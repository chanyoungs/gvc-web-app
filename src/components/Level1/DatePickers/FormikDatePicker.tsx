import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { DatePicker } from "@material-ui/pickers"
import { FieldAttributes, useField, useFormikContext } from "formik"
import React, { FC } from "react"

export function FormikDatePicker<T>({
  label,
  placeholder,
  variant,
  icon,
  ...props
}: FieldAttributes<{
  label: string
  name: keyof T
  variant?: "standard" | "filled" | "outlined"
  icon?: JSX.Element
}>) {
  const [field, meta] = useField(props)
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
      inputVariant={variant}
      onChange={(val) => {
        setFieldValue(field.name, val)
      }}
      InputProps={
        icon
          ? {
              endAdornment: (
                <InputAdornment position="end">{icon}</InputAdornment>
              ),
            }
          : {}
      }
    />
  )
}
