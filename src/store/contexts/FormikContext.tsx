import { SelectProps } from "@material-ui/core"
import { CheckboxProps } from "@material-ui/core/Checkbox"
import { FormControlTypeMap } from "@material-ui/core/FormControl"
import { RadioGroupProps } from "@material-ui/core/RadioGroup"
import { TextFieldProps } from "@material-ui/core/TextField"
import { DatePickerProps } from "@material-ui/pickers"
import { createContext } from "react"

export interface FormikContextProps {
  textField?: TextFieldProps
  datePicker?: Omit<DatePickerProps, "onChange" | "value">
  select?: Omit<SelectProps, "variant"> & {
    variant?: FormControlTypeMap["props"]["variant"]
  }
  radio?: RadioGroupProps
  checkbox?: CheckboxProps
}

export const FormikContext = createContext<FormikContextProps>({})
