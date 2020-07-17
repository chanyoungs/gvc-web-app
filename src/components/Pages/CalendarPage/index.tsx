import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import moment from "moment"
import React, { FC, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload } from "src/types"

import { CustomCalendar } from "./Calendar"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPCalendarPage {}

export interface ISCalendarPage {}

export const CalendarPage: FC<IPCalendarPage> = (props) => {
  const classes = useStyles()

  return (
    <Fragment>
      <AppBarMain title="Calendar" />
      {/* <ContainerMain> */}
      <CustomCalendar />
      {/* </ContainerMain> */}
    </Fragment>
  )
}
