import InputAdornment from "@material-ui/core/InputAdornment"
import { DatePicker } from "@material-ui/pickers"
import { FieldAttributes, useField, useFormikContext } from "formik"
import React from "react"
import { FormikContext } from "src/store/contexts/FormikContext"

export function FormikDatePicker<T>({
  label,
  placeholder,
  icon,
  ...props
}: FieldAttributes<{
  label: string
  name: keyof T
  icon?: JSX.Element
}>) {
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <FormikContext.Consumer>
      {(formikContext) => {
        const datePickerContext = formikContext.datePicker
          ? formikContext.datePicker
          : {}
        return (
          <DatePicker
            {...field}
            {...datePickerContext}
            label={label}
            placeholder={placeholder}
            helperText={errorText}
            error={!!errorText}
            disableFuture
            openTo="year"
            format="dd/MM/yyyy"
            views={["year", "month", "date"]}
            onChange={(val) => {
              setFieldValue(field.name, val)
            }}
            InputProps={{
              ...datePickerContext.InputProps,
              endAdornment: icon && (
                <InputAdornment position="end">{icon}</InputAdornment>
              ),
            }}
          />
        )
      }}
    </FormikContext.Consumer>
  )
}
