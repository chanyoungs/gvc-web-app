import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"

import { PrayersList, PrayersListProps } from "../../Level2/Lists/PrayersList"

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
  cell: "all" | "1" | "2" | "3"
  date: "all" | "2020/01/01" | "2020/01/08" | "2020/01/15"
}

export const PrayersFilter: FC<PrayersListProps> = ({
  prayers,
  membersDic,
  filter,
}) => {
  const classes = useStyles()
  const [cell, setCell] = useState<State["cell"]>("all")
  const [date, setDate] = useState<State["date"]>("all")

  const handleCellChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCell(event.target.value as State["cell"])
  }

  const handleDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDate(event.target.value as State["date"])
  }

  const filteredPrayers =
    prayers &&
    prayers.filter((prayer: PrayersListProps["prayers"][0]) => {
      if (
        (cell !== "all" && membersDic[prayer.memberId].cell !== cell) ||
        (date !== "all" &&
          prayer.date.toDate().toDateString() !== new Date(date).toDateString())
      ) {
        return false
      } else {
        return true
      }
    })

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="cell-select-label">Cell</InputLabel>
        <Select
          labelId="cell-select-label"
          id="cell-select"
          value={cell}
          onChange={handleCellChange}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"1"}>Cell1</MenuItem>
          <MenuItem value={"2"}>Cell2</MenuItem>
          <MenuItem value={"3"}>Cell3</MenuItem>
        </Select>
        <FormHelperText>Choose a cell</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="cell-select-label">Date</InputLabel>
        <Select
          labelId="date-select-label"
          id="date-select"
          value={date}
          onChange={handleDateChange}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"2020/01/01"}>2020/01/01</MenuItem>
          <MenuItem value={"2020/01/08"}>2020/01/08</MenuItem>
          <MenuItem value={"2020/01/15"}>2020/01/15</MenuItem>
        </Select>
        <FormHelperText>Choose a date</FormHelperText>
      </FormControl>

      <PrayersList
        prayers={filteredPrayers}
        membersDic={membersDic}
        filter={filter}
      />
    </Fragment>
  )
}
