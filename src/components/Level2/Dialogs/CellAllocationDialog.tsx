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
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomDialog } from "src/components/Level1/Dialogs/CustomDialog"
import { Searchbar } from "src/components/Level1/TextFields/Searchbar"
import { addNewCell, updateMemberCell } from "src/store/actions/adminActions"
import { AppState } from "src/store/reducers/rootReducer"
import { ICells, IMemberDownload, IMemberUpload } from "src/types"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    searchbar: {
      paddingBottom: theme.spacing(1),
    },
  })
)

export interface CellAllocationDialogProps {
  member: IMemberDownload | IMemberUpload
  open: boolean
  handleClose: () => void
  onConfirm?: (chosenCellId: string) => void
}

export const CellAllocationDialog: FC<CellAllocationDialogProps> = ({
  member,
  open,
  handleClose,
  onConfirm,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [newCellId, setNewCellId] = useState("na")
  const [addCellDialogOpen, setAddCellDialogOpen] = useState(false)
  const [addCellName, setAddCellName] = useState("")

  const initialiseCell = () =>
    setNewCellId(member.cell === "unassigned" ? "na" : member.cell)

  useEffect(() => {
    initialiseCell()
  }, [member.cell])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCellId((event.target as HTMLInputElement).value)
  }

  const cells: ICells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells?.cells
  )

  const cellAlreadyExists =
    Object.values(cells).filter((cell) => cell.name === addCellName).length > 0

  const handleCloseAddNewCellDialog = () => {
    setAddCellName("")
    setAddCellDialogOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onExited={initialiseCell}
    >
      <DialogTitle id="alert-dialog-title">{`Allocate ${member.name} to a cell`}</DialogTitle>
      <DialogContent>
        <Dialog open={addCellDialogOpen} onClose={handleCloseAddNewCellDialog}>
          <DialogContent>
            <TextField
              value={addCellName}
              onChange={(event) => setAddCellName(event.target.value)}
              label="New cell name"
              error={cellAlreadyExists}
              helperText={
                cellAlreadyExists && `Cell ${addCellName} already exists!`
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddNewCellDialog}>Cancel</Button>
            <Button
              onClick={() => {
                dispatch(addNewCell({ name: addCellName }))
                handleCloseAddNewCellDialog()
              }}
              disabled={cellAlreadyExists || addCellName === ""}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.searchbar}>
          <Searchbar setSearch={setSearch} />
        </div>
        <FormControl component="fieldset">
          <RadioGroup name="cell" value={newCellId} onChange={handleChange}>
            {cells &&
              Object.values(cells)
                .filter(
                  (c) =>
                    search === "" ||
                    c.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                )
                .sort((c1, c2) => {
                  if (c1.name === "N/A") return -1
                  else if (c2.name === "N/A") return 1
                  else return c1.name > c2.name ? 1 : -1
                })
                .map((cell) => (
                  <FormControlLabel
                    key={cell.id}
                    value={cell.id}
                    control={<Radio />}
                    label={cell.name}
                  />
                ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs>
            <Button
              color="secondary"
              onClick={() => setAddCellDialogOpen(true)}
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
                onConfirm
                  ? onConfirm(newCellId)
                  : member.cell !== newCellId &&
                    dispatch(
                      updateMemberCell({
                        memberId: member.id,
                        newCellId,
                      })
                    )

                handleClose()
              }}
              color="secondary"
              autoFocus
            >
              CONFIRM
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
