import InputAdornment from "@material-ui/core/InputAdornment"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import { FieldAttributes, useField } from "formik"
import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { OPEN_CELL_ALLOCATION_DIALOG } from "src/store/actions/types"
import { FormikContext } from "src/store/contexts/FormikContext"
import { AppState } from "src/store/reducers/rootReducer"
import { ICells } from "src/types"

export type FormikCellSelectionProps<Form> = FieldAttributes<{}> & {
  textFieldProps: TextFieldProps
  icon?: JSX.Element
  name: keyof Form
}

function FormikCellSelection<Form>({
  textFieldProps,
  icon,
  ...fieldProps
}: FormikCellSelectionProps<Form>) {
  const [field, meta, helpers] = useField(fieldProps)
  const cells: ICells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells?.cells
  )
  const dispatch = useDispatch()

  const errorText = meta.error && meta.touched ? meta.error : ""
  const { onChange, value: fieldValue, ...fieldReduced } = field

  const formikContext = useContext(FormikContext)
  const textFieldContext = formikContext.textField
    ? formikContext.textField
    : {}

  return (
    // <CellAllocationDialog
    //   cellCurrent={fieldValue as string}
    //   open={openCellAlllocationDialog}
    //   handleClose={() => setOpenCellAlllocationDialog(false)}
    //   onConfirm={(chosenCellId) => helpers.setValue(chosenCellId)}
    // />

    <TextField
      {...fieldReduced}
      value={cells[fieldValue as string].name}
      onClick={() =>
        dispatch({
          type: OPEN_CELL_ALLOCATION_DIALOG,
          payload: {
            cellCurrent: fieldValue as string,
            onConfirm: (chosenCellId: string) => helpers.setValue(chosenCellId),
          },
        })
      }
      {...({
        ...textFieldContext,
        ...textFieldProps,
      } as TextFieldProps)}
      helperText={errorText}
      error={!!errorText}
      InputProps={{
        ...textFieldContext.InputProps,
        endAdornment: icon && (
          <InputAdornment position="end">{icon}</InputAdornment>
        ),
      }}
    />
  )
}

export { FormikCellSelection }
