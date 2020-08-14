import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Fab from "@material-ui/core/Fab"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Snackbar from "@material-ui/core/Snackbar"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import ClearIcon from "@material-ui/icons/Clear"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import EventIcon from "@material-ui/icons/Event"
import InfoIcon from "@material-ui/icons/Info"
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
import { ReportsContainer } from "../Level2/Lists/ReportsContainer"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noticeAlert: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    datePicker: theme.typography.h4,
    fab: {
      margin: 0,
      top: "auto",
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      left: "auto",
      position: "fixed",
    },
    snackbar: {
      [theme.breakpoints.down("xs")]: {
        bottom: 90,
      },
    },
  })
)

export interface ReportsPageProps {}

export type ReportMode = "prayer" | "attendance"

export const ReportsPage: FC<ReportsPageProps> = (props) => {
  const classes = useStyles()
  const [date, setDate] = useState<Moment>(moment().day(0))
  const [reportMode, setReportMode] = useState<ReportMode>("prayer")
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
  const reports = useSelector<AppState, { [key: string]: IReport }>(
    (state) => state.firestore.data.reports
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
      <AppBarMain
        color={reportMode === "attendance" ? "secondary" : undefined}
        toolbar={
          reportMode === "attendance" ? (
            <Toolbar color="inherit" className={classes.toolbar}>
              <IconButton
                color="inherit"
                onClick={() => {
                  setReportMode("prayer")
                }}
              >
                <ClearIcon />
              </IconButton>
              <ButtonBase>
                <Typography>저장</Typography>
              </ButtonBase>
            </Toolbar>
          ) : undefined
        }
        title="기도제목"
      />
      <ContainerMain>
        <div className={classes.noticeAlert}>
          {reportMode === "prayer" ? (
            <NoticeAlert
              title={"공지"}
              content={"이번 주 오프라인으로 교회에서 예배드립니다."}
              severity="info"
              icon={<InfoIcon />}
            />
          ) : (
            <NoticeAlert
              title={"출석체크"}
              content={"셀원들의 출석을 체크하고 저장해주세요."}
              severity="error"
              icon={<InfoIcon />}
            />
          )}
        </div>
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
          <ReportsContainer
            reports={reports}
            members={members}
            date={date}
            reportMode={reportMode}
          />
        ) : (
          "Loading data..."
        )}
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={() => {
            setReportMode("attendance")
          }}
        >
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
