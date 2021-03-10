import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { useField } from "formik"
import React, { FC, useState } from "react"
import { FormikTextField } from "src/components/Level1/TextFields/FormikTextField"
import { FormikContext } from "src/store/contexts/FormikContext"
import { ISignUp } from "src/types"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({ checkbox: { paddingBottom: 0 } })
)

export interface AuthCheckboxTextFieldProps {
  label: string
  placeholder: string
  name: keyof ISignUp
}

export const AuthCheckboxTextField: FC<AuthCheckboxTextFieldProps> = ({
  label,
  placeholder,
  name,
}) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  const [{ value }] = useField(name)

  return (
    <FormikContext.Consumer>
      {(formikContext) => {
        const checkboxContext = formikContext.checkbox
          ? formikContext.checkbox
          : {}
        return (
          <FormControlLabel
            control={<Checkbox className={classes.checkbox} />}
            checked={!!value}
            label={
              <FormikTextField
                textFieldProps={{
                  label,
                  placeholder,
                  variant: "standard",
                }}
                name={name}
              />
            }
          />
        )
      }}
    </FormikContext.Consumer>
  )
}
