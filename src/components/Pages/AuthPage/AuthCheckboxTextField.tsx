import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, useState } from "react"
import { ISignUp } from "src/types"

import { AuthTextField } from "./AuthTextField"

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

  return (
    <FormControlLabel
      control={
        <Checkbox
          value={checked}
          onChange={(event) => {
            setChecked(event.target.checked)
          }}
          className={classes.checkbox}
        />
      }
      label={
        <AuthTextField
          textFieldProps={{
            label,
            placeholder,
            variant: "standard",
            disabled: !checked,
          }}
          name={name}
        />
      }
    />
  )
}
