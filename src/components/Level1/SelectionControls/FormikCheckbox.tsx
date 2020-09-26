import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormLabel from "@material-ui/core/FormLabel"
import Typography, { TypographyProps } from "@material-ui/core/Typography"
import { FieldAttributes, useField } from "formik"
import React, { ReactNode } from "react"

export function FormikCheckBox<T>({
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
  return (
    <FormControl required={required} error={!!errorText} component="fieldset">
      {groupLabel && <FormLabel component="legend">{groupLabel}</FormLabel>}
      <FormControlLabel control={<Checkbox {...field} />} label={label} />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}
