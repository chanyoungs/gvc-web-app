import React, { FC, Fragment } from "react"
import { IAuthForm } from "src/types"

import { FormikTextField, FormikTextFieldProps } from "./FormikTextField"

export const AuthTextField: FC<FormikTextFieldProps<IAuthForm>> = (props) => (
  <FormikTextField<IAuthForm> {...props} variant="outlined" />
)
