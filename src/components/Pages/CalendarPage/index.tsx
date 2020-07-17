import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "src/store/reducers/rootReducer"
import { useFirestoreConnect } from "react-redux-firebase"
import { IMemberDownload } from "src/types"
import moment from "moment"
import Button from "@material-ui/core/Button"
import { CustomCalendar } from "./Calendar"
const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPCalendarPage {}

export interface ISCalendarPage {}

export const CalendarPage: FC<IPCalendarPage> = (props) => {
  const classes = useStyles()

  return (
    <Fragment>
      <AppBarMain title="Calendar" />
      <CustomCalendar />
      {/* </ContainerMain> */}
    </Fragment>
  )
}
