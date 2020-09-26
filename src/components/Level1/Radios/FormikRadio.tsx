import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { FieldAttributes, useField } from "formik"
import React, { FC } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { width: "100%" },
    radio: { flex: 1 },
  })
)

export function FormikRadio<T, V>({
  label,
  placeholder,
  radios,
  ...props
}: FieldAttributes<{}> & {
  label?: string
  name: keyof T
  radios: { value: V; label: string }[]
}) {
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
            key={radio.label}
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
