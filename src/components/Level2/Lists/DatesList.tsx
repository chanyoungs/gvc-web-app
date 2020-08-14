import Avatar from "@material-ui/core/Avatar"
import ButtonBase from "@material-ui/core/ButtonBase"
import { red } from "@material-ui/core/colors"
import Container from "@material-ui/core/Container"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import moment, { Moment } from "moment"
import React, { FC, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { DatePaper } from "src/components/Level1/Papers/DatePaper"
import { queryPrayer } from "src/store/actions/prayerActions"
import { AppState } from "src/store/reducers/rootReducer"

import { CustomList } from "./CustomList"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      maxHeight: 400,
    },
    avatar: {
      backgroundColor: red[500],
    },
    subheader: {
      background: theme.palette.background.default,
    },
    ul: {
      padding: 0,
    },
    paper: {
      background: theme.palette.primary.main,
      width: "100%",
    },
    text: {
      color: theme.palette.secondary.dark,
    },
    container: {
      padding: theme.spacing(0.5),
    },
    buttonBase: {
      width: "100%",
    },
  })
)

export interface DatesListProps {
  from: Moment
  to: Moment
}
type MYandS = { subheader: string; subitems: Moment[] }
export interface State {}

export const DatesList: FC<DatesListProps> = ({ from, to }) => {
  const classes = useStyles()

  const search = useSelector<AppState, string>((state) => state.appBar.search)
  const dispatch = useDispatch()
  const history = useHistory()

  const mYandSs: MYandS[] = []
  let startSun = moment(from, "YYYYMMDD").day(7)
  let endSun = moment(to).day(0)
  while (startSun <= endSun) {
    let monthYear = endSun.format("MMMM YYYY")
    if (
      mYandSs.length === 0 ||
      mYandSs[mYandSs.length - 1].subheader !== monthYear
    ) {
      mYandSs.push({ subheader: monthYear, subitems: [] })
    }
    if (endSun.format("DD/MM/YYYY").includes(search)) {
      mYandSs[mYandSs.length - 1].subitems.push(endSun)
    }
    endSun = moment(endSun).subtract(7, "days")
  }

  const onClick = (sunday: Moment) => () => {
    dispatch(
      queryPrayer(
        [
          ["date", "<=", moment(sunday).add(1, "day").toDate()],
          ["date", ">=", moment(sunday).subtract(1, "day").toDate()],
        ],
        () => {
          history.push("/prayers")
        }
      )
    )
  }

  const render = (sunday: Moment) => (
    <ListItem key={sunday.toString()}>
      <ButtonBase className={classes.buttonBase} onClick={onClick(sunday)}>
        <DatePaper date={sunday} />
      </ButtonBase>
    </ListItem>
  )

  return <CustomList items={mYandSs} render={render} />
}
