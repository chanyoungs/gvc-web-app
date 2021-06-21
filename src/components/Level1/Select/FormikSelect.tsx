import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { FieldAttributes, useField } from "formik"
import React from "react"
import { FormikContext } from "src/store/contexts/FormikContext"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { width: "100%" },
  })
)

export function FormikSelect<T, V>({
  label,
  placeholder,
  menuItems,
  ...props
}: FieldAttributes<{}> & {
  label: string
  name: keyof T
  menuItems: { value: V; label: string }[]
}) {
  const classes = useStyles()
  const [field, meta] = useField({ ...props, type: "select" })
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <FormikContext.Consumer>
      {(formikContext) => {
        const { variant, ...selectContext } = formikContext.select
          ? formikContext.select
          : { variant: undefined }
        return (
          <FormControl
            variant={variant}
            required
            error={!!errorText}
            className={classes.root}
          >
            <InputLabel>{label}</InputLabel>
            <Select {...field} {...selectContext} label={label}>
              {menuItems.map((menuItem) => (
                <MenuItem
                  key={menuItem.label}
                  value={(menuItem.value as unknown) as string | undefined}
                >
                  {menuItem.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errorText}</FormHelperText>
          </FormControl>
        )
      }}
    </FormikContext.Consumer>
  )
}
