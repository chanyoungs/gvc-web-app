import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { localise } from "src/utils/localisation"

import { CustomCalendar } from "./Calendar"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface CalendarPageProps {}

export interface ISCalendarPage {}

export const CalendarPage: FC<CalendarPageProps> = (props) => {
  const classes = useStyles()

  return (
    <Fragment>
      <AppBarMain title={localise({ english: "Calendar", korean: "달력" })} />
      {/* <ContainerMain> */}
      <CustomCalendar />
      {/* </ContainerMain> */}
    </Fragment>
  )
}
