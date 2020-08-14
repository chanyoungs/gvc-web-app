import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

import { IMemberDownload } from "../../../types"
import { MembersList } from "../../Level2/Lists/MembersList"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

interface State {
  editMode: boolean
  filter: "all" | "leaders" | "cell"
  cell: "1" | "2" | "3" | ""
}

interface Props {
  members: IMemberDownload[]
  filter: string
}

export function MembersFilter({ members }: Props) {
  const classes = useStyles()
  const [editMode, setEditMode] = React.useState<State["editMode"]>(false)
  const [filter, setFilter] = React.useState<State["filter"]>("all")
  const [cell, setCell] = React.useState<State["cell"]>("")

  // const inputLabel = React.useRef<HTMLLabelElement>(null)
  // const [labelWidth, setLabelWidth] = React.useState(0)
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth)
  // }, [])

  const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditMode(event.target.checked as State["editMode"])
  }

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as State["filter"])
  }

  const handleCellChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCell(event.target.value as State["cell"])
  }

  const filteredMembers =
    members &&
    members.filter((member) => {
      switch (filter) {
        case "all":
          return true
        case "leaders":
          return member.positions.includes("leader")
        case "cell":
          return member.cell === cell
        default:
          return member
      }
    })

  return (
    <Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={editMode}
            onChange={handleEditModeChange}
            value="editMode"
          />
        }
        label="Edit?"
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="members-filter-label">Filter</InputLabel>
        <Select
          labelId="members-filter-label"
          id="members-filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"leaders"}>Leaders</MenuItem>
          <MenuItem value={"cell"}>Cell</MenuItem>
        </Select>
        <FormHelperText>Choose a filter</FormHelperText>
      </FormControl>
      {filter === "cell" && (
        <FormControl className={classes.formControl}>
          <InputLabel id="cell-select-label">Cell</InputLabel>
          <Select
            labelId="cell-select-label"
            id="cell-select"
            value={cell}
            onChange={handleCellChange}
          >
            <MenuItem value={"1"}>Cell1</MenuItem>
            <MenuItem value={"2"}>Cell2</MenuItem>
            <MenuItem value={"3"}>Cell3</MenuItem>
          </Select>
          <FormHelperText>Choose a date</FormHelperText>
        </FormControl>
      )}
      <MembersList editMode={editMode} members={filteredMembers} />
    </Fragment>
  )
}
