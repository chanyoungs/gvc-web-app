import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomDialog } from "src/components/Level1/Dialogs/CustomDialog"
import { Searchbar } from "src/components/Level1/TextFields/Searchbar"
import { updateMemberCell } from "src/store/actions/adminActions"
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
  onConfirm,
  ...rest
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [newCellId, setNewCellId] = useState("na")

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

  return (
    <CustomDialog
      onExited={initialiseCell}
      title={`Allocate ${member.name} to a cell`}
      content={
        <Fragment>
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
        </Fragment>
      }
      onConfirm={
        onConfirm
          ? () => onConfirm(newCellId)
          : () => {
              if (member.cell !== newCellId) {
                dispatch(
                  updateMemberCell({
                    memberId: member.id,
                    currentCellId: member.cell,
                    newCellId,
                  })
                )
              }
            }
      }
      {...rest}
    />
  )
}
