import { FormControl, FormControlLabel, FormHelperText } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { FieldAttributes, useField } from "formik"
import React, { FC } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { width: "100%" },
    radio: { flex: 1 },
  })
)

export function FormikRadio<T>({
  label,
  placeholder,
  radios,
  ...props
}: FieldAttributes<{
  label?: string
  name: keyof T
  radios: { value: string; label: string }[]
}>) {
  const classes = useStyles()
  const [field, meta] = useField({ ...props, type: "radio" })
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <FormControl
      required
      error={!!errorText}
      component="fieldset"
      className={classes.root}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup row {...field}>
        {radios.map((radio) => (
          <FormControlLabel
            key={radio.value}
            {...radio}
            control={<Radio />}
            className={classes.radio}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}
