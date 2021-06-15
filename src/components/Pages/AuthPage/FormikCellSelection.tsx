import InputAdornment from "@material-ui/core/InputAdornment"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import { FieldAttributes, useField } from "formik"
import React, { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { CellAllocationDialog } from "src/components/Level2/Dialogs/CellAllocationDialog"
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
  const [openCellAlllocationDialog, setOpenCellAlllocationDialog] =
    useState(false)

  const cells: ICells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells?.cells
  )

  const errorText = meta.error && meta.touched ? meta.error : ""
  const { onChange, value: fieldValue, ...fieldReduced } = field

  return (
    <Fragment>
      <CellAllocationDialog
        cellCurrent={fieldValue as string}
        open={openCellAlllocationDialog}
        handleClose={() => setOpenCellAlllocationDialog(false)}
        onConfirm={(chosenCellId) => helpers.setValue(chosenCellId)}
      />
      <FormikContext.Consumer>
        {(formikContext) => {
          const textFieldContext = formikContext.textField
            ? formikContext.textField
            : {}
          return (
            <TextField
              {...fieldReduced}
              value={cells[fieldValue as string].name}
              onClick={() => setOpenCellAlllocationDialog(true)}
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
        }}
      </FormikContext.Consumer>
    </Fragment>
  )
}

export { FormikCellSelection }
