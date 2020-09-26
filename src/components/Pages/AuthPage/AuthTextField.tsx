import React, { FC } from "react"
import { AuthTypes } from "src/types"

import { FormikTextField, FormikTextFieldProps } from "../../Level1/TextFields/FormikTextField"

export const AuthTextField: FC<FormikTextFieldProps<AuthTypes>> = (props) => (
  <FormikTextField<AuthTypes> {...props} variant="outlined" />
)
