import Button from "@material-ui/core/Button"
import Fab from "@material-ui/core/Fab"
import InputAdornment from "@material-ui/core/InputAdornment"
import Snackbar from "@material-ui/core/Snackbar"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import EventIcon from "@material-ui/icons/Event"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { IAlertState } from "src/store/reducers/alertReducer"
import { IMemberDownload, IReport } from "src/types"
import { ALERT_SAVED } from "src/types/actions"

import { AppState } from "../../store/reducers/rootReducer"
import { NoticeAlert } from "../Level1/Alerts/NoticeAlert"
import { PrayersContainer } from "../Level2/Lists/PrayersContainer"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: { backgroundColor: theme.palette.common.black },
    datePicker: theme.typography.h4,
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    snackbar: {
      [theme.breakpoints.down("xs")]: {
        bottom: 90,
      },
    },
  })
)

export interface IPPrayersPage {}

export const PrayersPage: FC<IPPrayersPage> = (props) => {
  const classes = useStyles()
  const [date, setDate] = useState<Moment>(moment().day(0))
  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  const dispatch = useDispatch()

  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  useFirestoreConnect([
    {
      collection: "members",
      orderBy: ["name", "asc"],
      where: ["cell", "==", profile.cell ? profile.cell : ""],
    },
  ])

  useFirestoreConnect([
    {
      collection: "reports",
      where: [
        ["date", "==", date.format("YYYY.MM.DD")],
        ["cell", "==", profile.cell ? profile.cell : ""],
      ],
    },
  ])

  const stateFS = useSelector<AppState, any>((state) => state.firestore)
  const notices = stateFS.ordered.notices
  const members = useSelector<AppState, IMemberDownload[]>(
    (state) => state.firestore.ordered.members
  )
  const reports = useSelector<AppState, IReport[]>(
    (state) => state.firestore.ordered.reports
  )

  const alertSaved = useSelector<AppState, IAlertState["saved"]>(
    (state) => state.alert.saved
  )

  const handleSnackbarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }
    dispatch({ type: ALERT_SAVED, payload: false })
  }

  return (
    <Fragment>
      <AppBarMain title="기도제목" />
      <ContainerMain>
        <NoticeAlert
          title={"출석체크"}
          content={"프로필 이미지를 누르면 출석으로 저장됩니다."}
        />

        <DatePicker
          fullWidth
          variant="inline"
          shouldDisableDate={(date) => date?.getDay() !== 0}
          value={date.toDate()}
          disableFuture
          format="dd MMM yyyy"
          autoOk
          onChange={(date: Date | null) => {
            if (date) {
              setDate(moment(date))
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
            classes: { input: classes.datePicker },
          }}
        />
        {isLoaded(reports) && isLoaded(members) ? (
          <PrayersContainer reports={reports} members={members} date={date} />
        ) : (
          "Loading data..."
        )}
        <Fab color="secondary" className={classes.fab}>
          <DoneAllIcon />
        </Fab>
        <Snackbar
          open={alertSaved}
          autoHideDuration={1000}
          message="Changes saved."
          onClose={handleSnackbarClose}
          action={
            <Button
              color="secondary"
              size="small"
              onClick={handleSnackbarClose}
            >
              CLOSE
            </Button>
          }
          className={classes.snackbar}
        />
      </ContainerMain>
    </Fragment>
  )
}
