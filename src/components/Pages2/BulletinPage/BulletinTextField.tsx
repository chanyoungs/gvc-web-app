import React, { FC } from "react"

import { IBulletin } from "."
import { FormikTextField, FormikTextFieldProps } from "../../Level1/TextFields/FormikTextField"

export const AuthTextField: FC<FormikTextFieldProps<IBulletin>> = (props) => (
  <FormikTextField<IBulletin> {...props} variant="outlined" />
)
