import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Divider from "@material-ui/core/Divider"
import Fab from "@material-ui/core/Fab"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Snackbar from "@material-ui/core/Snackbar"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Zoom from "@material-ui/core/Zoom"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import EventIcon from "@material-ui/icons/Event"
import InfoIcon from "@material-ui/icons/Info"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import SwipeableViews from "react-swipeable-views"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { ALERT_CLOSE, ALERT_SAVED } from "src/store/actions/types"
import { IAlertState } from "src/store/reducers/alertReducer"
import { IMemberDownload, IReports } from "src/types"

import { AppState } from "../../store/reducers/rootReducer"
import { NoticeAlert } from "../Level1/Alerts/NoticeAlert"
import { LoadingBackdrop } from "../Level1/Backdrops/LoadingBackdrop"
import { LoadingProgress } from "../Level1/Progress/LoadingProgress"
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
      justifyContent: "flex-end",
    },
    datePicker: theme.typography.h4,
    datePickerContainer: {
      display: "flex",
      justifyContent: "center",
    },
    divider: {
      background: theme.palette.primary.light,
    },
    fab: {
      margin: 0,
      top: "auto",
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      left: "auto",
      position: "fixed",
    },
    share: {
      margin: 0,
      top: "auto",
      right: "auto",
      left: theme.spacing(2),
      bottom: theme.spacing(2),
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
  const [reportModeIndex, setReportModeIndex] = useState(0)
  const reportModes: ReportMode[] = ["prayer", "attendance"]

  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  const theme = useTheme()

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  const dispatch = useDispatch()
  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"))

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
  const reports = useSelector<AppState, IReports>(
    (state) => state.firestore.data.reports
  )
  const localReports = useSelector<AppState, IReports>((state) => state.reports)

  const alert = useSelector<AppState, IAlertState>((state) => state.alert)

  const [backdropOpen, setBackdropOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleSnackbarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }
    dispatch({ type: ALERT_CLOSE })
  }

  const isThisWeek = () => moment(date).add(1, "week") > moment().day(0)

  const nav: any = navigator
  const onShare = async () => {
    console.log({ members, reports })

    const reportContent = {
      title: `Prayer list ${date.format("YYYY/MM/DD")}`,
      text: members
        ? members
            .map((member) => {
              const reportId = `${date.format("YYYY.MM.DD")}-${member.id}`
              const report = reports && reportId in reports && reports[reportId]
              const prayer = report && "prayer" in report ? report.prayer : ""
              return `${member.name}:\n${prayer}\n`
            })
            .join("\n")
        : "",
      url: "https://london-gvc.web.app",
    }
    console.log("Attempting to share")
    if (nav.share) {
      console.log("nav.share exists!")
      nav
        .share(reportContent)
        .then(() => {
          console.log("Successful share")
        })
        .catch((error: Error) => {
          console.error(error)
        })
    } else {
      console.log("nav.share doesn't exist!")
      try {
        await navigator.clipboard.writeText(
          `${reportContent.title}\n${reportContent.text}\n${reportContent.url}`
        )
        dispatch({
          type: ALERT_SAVED,
          payload: "Reports copied to clipboard!",
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Fragment>
      <AppBarMain onShare={onShare} title="Reports" />
      <ContainerMain>
        <div className={classes.noticeAlert}>
          {reportModes[reportModeIndex] === "prayer" ? (
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
        <div className={classes.datePickerContainer}>
          <IconButton
            onClick={() => {
              setDate(moment(date).subtract(1, "week"))
            }}
          >
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
          <DatePicker
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
            inputProps={{ style: { textAlign: "center" } }}
            InputProps={{
              disableUnderline: true,
              // startAdornment: (
              //   <InputAdornment position="start">
              //     <EventIcon />
              //   </InputAdornment>
              // ),
              classes: { input: classes.datePicker },
            }}
          />
          <IconButton
            onClick={() => {
              if (!isThisWeek()) setDate(moment(date).add(1, "week"))
            }}
            disabled={isThisWeek()}
          >
            <NavigateNextIcon fontSize="large" />
          </IconButton>
        </div>
        <Divider className={classes.divider} />
        <Tabs
          variant="fullWidth"
          value={reportModeIndex}
          onChange={(event: React.ChangeEvent<{}>, value: number) =>
            setReportModeIndex(value)
          }
        >
          <Tab label="Prayers" />
          <Tab label="Attendance" />
        </Tabs>
        {isLoaded(reports) && isLoaded(members) ? (
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={reportModeIndex}
            onChangeIndex={setReportModeIndex}
          >
            {reportModes.map((reportMode) => (
              <ReportsContainer
                key={reportMode}
                reports={reports}
                members={members}
                date={date}
                reportMode={reportMode}
                setIsTyping={setIsTyping}
              />
            ))}
          </SwipeableViews>
        ) : (
          <LoadingProgress />
        )}
        <Snackbar
          open={alert.open}
          autoHideDuration={1000}
          message={alert.message}
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
        <LoadingBackdrop open={backdropOpen} />
      </ContainerMain>
    </Fragment>
  )
}
