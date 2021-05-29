import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { CustomDialog } from "src/components/Level1/Dialogs/CustomDialog"
import { AppState } from "src/store/reducers/rootReducer"
import { ICells, IMemberDownload } from "src/types"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface CellAllocationDialogProps {
  member: IMemberDownload
  open: boolean
  handleClose: () => void
}

export const CellAllocationDialog: FC<CellAllocationDialogProps> = ({
  member,
  ...rest
}) => {
  const classes = useStyles()
  const [chosenCell, setChosenCell] = useState("n/a")

  const initialiseCell = () =>
    setChosenCell(member.cell === "" ? "n/a" : member.cell)

  useEffect(() => {
    initialiseCell()
  }, [member.cell])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenCell((event.target as HTMLInputElement).value)
  }

  const cells: ICells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells?.cells
  )

  return (
    <CustomDialog
      onExited={initialiseCell}
      title={`Allocate ${member.name} to a cell`}
      content={
        <FormControl component="fieldset">
          <FormLabel component="legend">Cells</FormLabel>
          <RadioGroup name="cell" value={chosenCell} onChange={handleChange}>
            <FormControlLabel value="n/a" control={<Radio />} label="N/A" />
            {cells &&
              Object.values(cells).map((cell) => (
                <FormControlLabel
                  key={cell.id}
                  value={cell.id}
                  control={<Radio />}
                  label={cell.name}
                />
              ))}
          </RadioGroup>
        </FormControl>
      }
      onConfirm={() => {
        console.log(
          `Assign member: ${member.name} -> cell: ${cells[chosenCell].name}`
        )
      }}
      {...rest}
    />
  )
}
