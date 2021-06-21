import Grid from "@material-ui/core/Grid"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppState } from "src/store/reducers/rootReducer"

import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"
import { DatesList } from "../Level2/Lists/DatesList"
import { Notices } from "../Level2/SwipeableListViews/Notices"

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
// const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface ISDatesPage {
  from: Moment
  to: Moment
}

export const DatesPage: FC = () => {
  // const classes = useStyles()
  const [dates, setDates] = useState<ISDatesPage>({
    from: moment(moment().format("YYYY") + "0101", "YYYYMMDD"),
    to: moment(),
  })

  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  const noticesArr = useSelector<AppState, any>(
    (state) => state.firestore.ordered.notices
  )

  const changeDate = (dateType: keyof ISDatesPage) => (date: Date | null) => {
    if (date) {
      setDates({ ...dates, [dateType]: moment(date) })
    }
  }

  return (
    <Fragment>
      <AppBarMain title="Prayers" />
      <ContainerMain>
        <Notices notices={noticesArr} />

        <Grid container>
          <Grid item xs={6}>
            <DatePicker
              label={"From"}
              value={dates.from.toDate()}
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              views={["year", "month", "date"]}
              onChange={changeDate("from")}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label={"To"}
              value={dates.to.toDate()}
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              views={["year", "month", "date"]}
              onChange={changeDate("to")}
            />
          </Grid>
        </Grid>
        <DatesList from={dates.from} to={dates.to} />
      </ContainerMain>
    </Fragment>
  )
}
