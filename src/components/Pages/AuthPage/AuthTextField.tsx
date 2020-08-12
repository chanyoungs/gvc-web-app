import React, { FC } from "react"
import { IAuthForm } from "src/types"

import { FormikTextField, FormikTextFieldProps } from "../../Level1/TextFields/FormikTextField"

export const AuthTextField: FC<FormikTextFieldProps<IAuthForm>> = (props) => (
  <FormikTextField<IAuthForm> {...props} variant="outlined" />
)
