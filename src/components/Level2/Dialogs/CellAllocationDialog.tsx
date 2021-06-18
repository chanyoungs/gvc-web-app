import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import React, { FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Searchbar } from "src/components/Level1/TextFields/Searchbar"
import { addNewCell } from "src/store/actions/adminActions"
import { AppState } from "src/store/reducers/rootReducer"
import { CELL_UNASSIGNED_ID, ICells } from "src/types"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    searchbar: {
      paddingBottom: theme.spacing(1),
    },
  })
)

export interface CellAllocationDialogProps {
  cellCurrent?: string
  cellRequest?: string
  open: boolean
  handleClose: () => void
  onConfirm: (chosenCellId: string) => void
}

export const CellAllocationDialog: FC<CellAllocationDialogProps> = ({
  cellCurrent = CELL_UNASSIGNED_ID,
  cellRequest,
  open,
  handleClose,
  onConfirm,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [newCellId, setNewCellId] = useState("na")
  const [addCellDialogOpen, setAddCellDialogOpen] = useState(false)
  const [addNewCellName, setAddNewCellName] = useState("")

  const newCellNameTextField = useRef<HTMLInputElement>(null)

  const initialiseCell = () => {
    setNewCellId(cellRequest || cellCurrent)
    setAddNewCellName("")
  }

  useEffect(() => {
    initialiseCell()
  }, [cellCurrent, cellRequest])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCellId((event.target as HTMLInputElement).value)
  }

  const cells: ICells = useSelector<AppState, ICells>((state) => {
    const cells = state.firestore.data.cells?.cells
    return cells ? cells : {}
  })

  const lead = [CELL_UNASSIGNED_ID, "na"]

  const cellsKeysSorted = [
    ...lead,
    ...Object.keys(cells).filter((key) => !lead.includes(key)),
  ]

  const cellAlreadyExists =
    Object.values(cells).filter((cell) => cell.name === addNewCellName).length >
    0

  const ADD_NEW_CELL_SELECTION = "addNewCell"

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onExited={initialiseCell}
    >
      <DialogTitle id="alert-dialog-title">Select a cell</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Current cell: ${cells[cellCurrent].name}`}</DialogContentText>
        {cellRequest !== cellCurrent && cellRequest && (
          <DialogContentText>{`Requested cell: ${cells[cellRequest].name}`}</DialogContentText>
        )}
        <div className={classes.searchbar}>
          <Searchbar setSearch={setSearch} />
        </div>
        <FormControl component="fieldset">
          <RadioGroup name="cell" value={newCellId} onChange={handleChange}>
            {cells &&
              cellsKeysSorted
                .filter(
                  (cellKey) =>
                    search === "" ||
                    cells[cellKey].name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                )
                .map((cellKey) => {
                  const cell = cells[cellKey]
                  return (
                    cell && (
                      <FormControlLabel
                        key={cell.id}
                        value={cell.id}
                        control={<Radio />}
                        label={cell.name}
                      />
                    )
                  )
                })}
            <FormControlLabel
              control={<Radio />}
              value={ADD_NEW_CELL_SELECTION}
              label={
                <TextField
                  inputRef={newCellNameTextField}
                  value={addNewCellName}
                  onChange={(event) => setAddNewCellName(event.target.value)}
                  label="New Cell Name"
                  error={cellAlreadyExists}
                  helperText={
                    cellAlreadyExists &&
                    `Cell ${addNewCellName} already exists!`
                  }
                  onFocus={() => setNewCellId(ADD_NEW_CELL_SELECTION)}
                />
              }
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs>
            <Button
              color="secondary"
              onClick={() => newCellNameTextField.current?.focus()}
            >
              Add Cell
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                handleClose()
              }}
              color="secondary"
            >
              CANCEL
            </Button>
            <Button
              onClick={() => {
                if (cellCurrent !== newCellId) {
                  if (newCellId !== ADD_NEW_CELL_SELECTION) {
                    onConfirm(newCellId)
                  } else {
                    dispatch(addNewCell({ name: addNewCellName, onConfirm }))
                  }
                }
                handleClose()
              }}
              color="secondary"
              autoFocus
              disabled={
                cellAlreadyExists ||
                (newCellId === ADD_NEW_CELL_SELECTION && addNewCellName === "")
              }
            >
              CONFIRM
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
