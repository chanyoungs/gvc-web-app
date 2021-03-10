import { SelectProps } from "@material-ui/core"
import { FormControlTypeMap } from "@material-ui/core/FormControl"
import { TextFieldProps } from "@material-ui/core/TextField"
import { DatePickerProps } from "@material-ui/pickers"
import { createContext } from "react"

export interface FormikContextProps {
  textField?: TextFieldProps
  datePicker?: Omit<DatePickerProps, "onChange" | "value">
  select?: Omit<SelectProps, "variant"> & {
    variant?: FormControlTypeMap["props"]["variant"]
  }
}

export const FormikContext = createContext<FormikContextProps>({})
