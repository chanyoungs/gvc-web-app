import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { FieldAttributes, useField } from "formik"
import React, { useContext } from "react"
import { FormikContext } from "src/store/contexts/FormikContext"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { width: "100%" },
    radio: { flex: 1 },
    formLabel: { fontSize: "0.75em" },
  })
)

export type FormikRadioProps<T, V> = FieldAttributes<{}> & {
  label?: string
  name: keyof T
  radios: { value: V; label: string }[]
}

export function FormikRadio<T, V>({
  label,
  placeholder,
  radios,
  ...props
}: FormikRadioProps<T, V>) {
  const classes = useStyles()
  // TODO: Dirty fix
  const [{ value }] = useField(props)
  const [field, meta] = useField({
    ...props,
    type: "radio",
    value: value as string,
  })

  const errorText = meta.error && meta.touched ? meta.error : ""
  const formikContext = useContext(FormikContext)
  const radioContext = formikContext.radio ? formikContext.radio : {}
  return (
    <FormControl
      required
      error={!!errorText}
      component="fieldset"
      className={classes.root}
    >
      {label && (
        <FormLabel component="legend" className={classes.formLabel}>
          {label}
        </FormLabel>
      )}
      <RadioGroup row {...field} {...radioContext}>
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
