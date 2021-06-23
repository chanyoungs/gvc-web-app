import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormLabel from "@material-ui/core/FormLabel"
import { FieldAttributes, useField } from "formik"
import React, { ReactNode, useContext } from "react"
import { FormikContext } from "src/store/contexts/FormikContext"

export function FormikCheckbox<T>({
  label,
  groupLabel,
  placeholder,
  required,
  ...props
}: FieldAttributes<{}> & {
  label: ReactNode
  groupLabel?: string
  required?: boolean
  name: keyof T
}) {
  const [field, meta] = useField({ ...props, type: "checkbox" })
  const errorText = meta.error && meta.touched ? meta.error : ""
  const formikContext = useContext(FormikContext)
  const checkboxContext = formikContext.checkbox ? formikContext.checkbox : {}
  return (
    <FormControl required={required} error={!!errorText} component="fieldset">
      {groupLabel && <FormLabel component="legend">{groupLabel}</FormLabel>}
      <FormControlLabel
        control={<Checkbox {...field} {...checkboxContext} />}
        label={label}
      />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}
