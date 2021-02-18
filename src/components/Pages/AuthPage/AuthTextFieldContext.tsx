import React, { FC } from "react"
import { FormikTextFieldContext } from "src/components/Level1/TextFields/FormikTextFieldContext"

export const AuthTextFieldContext: FC = ({ children }) => (
  <FormikTextFieldContext.Provider
    value={{ variant: "outlined", fullWidth: true }}
  >
    {children}
  </FormikTextFieldContext.Provider>
)
