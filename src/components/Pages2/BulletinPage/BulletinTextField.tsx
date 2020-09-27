import React, { FC } from "react"

import { IBulletin } from "."
import { FormikTextField, FormikTextFieldProps } from "../../Level1/TextFields/FormikTextField"

export const BulletinTextField: FC<FormikTextFieldProps<IBulletin>> = ({
  textFieldProps,
  ...rest
}) => (
  <FormikTextField<IBulletin>
    textFieldProps={{ ...textFieldProps, variant: "outlined", fullWidth: true }}
    {...rest}
  />
)
