import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import React, { FC, useEffect } from "react"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomAvatar } from "src/components/Level2/Avatars/CustomAvatar"
import { getName } from "src/components/Level2/Lists/listUtils"
import { ProfileMenu } from "src/components/Level2/Menus/ProfileMenu"
import { ReportMode } from "src/components/Pages/ReportsPage"
import { getReportDocId, updateReport, uploadReport } from "src/store/actions/reportActions"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberWithId, IReport } from "src/types"
import { localise } from "src/utils/localisation"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textFieldInputProps: {
      // paddingBottom: 0, // Fixes styling break problem when switching between prayer<->attendance
    },
    listItem: {
      paddingLeft: 0,
      // paddingRight: 0,
    },
  })
)
export interface ReportListItemProps {
  member: IMemberWithId
  report: IReport
  reportMode: ReportMode
  setIsTyping: (isTyping: boolean) => void
}

export const ReportListItem: FC<ReportListItemProps> = ({
  member,
  report,
  reportMode,
  setIsTyping,
}) => {
  const classes = useStyles()

  const reportLocal = useSelector<AppState, IReport | undefined>(
    (state) => state.reports[getReportDocId(report)]
  )

  const prayer = reportLocal ? reportLocal.prayer : report.prayer
  const attendance = reportLocal ? reportLocal.attendance : report.attendance

  const dispatch = useDispatch()
  const setPrayer = useCallback((prayer: string) => {
    if (reportLocal) dispatch(updateReport({ ...reportLocal, prayer }))
  }, [dispatch, reportLocal])

  const setAttendance = (attendance: IReport["attendance"]) => {
    if (reportLocal) {
      const newReport = { ...reportLocal, attendance }
      dispatch(updateReport(newReport))
      dispatch(uploadReport(newReport, false))
    }
  }

  useEffect(() => {
    dispatch(updateReport(report))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report])

  useEffect(() => {
    setPrayer(report.prayer)
  }, [report.prayer, setPrayer])

  useEffect(() => {
    if (reportLocal)
      dispatch(updateReport({ ...reportLocal, attendance: report.attendance }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    report.attendance.cell,
    report.attendance.service,
    report.attendance.info,
    reportLocal
  ])

  const savePrayerChanges = () => {
    if (prayer !== report.prayer) dispatch(uploadReport({ ...report, prayer }))
  }
  
  useEffect(() => {
    const timer = setTimeout(savePrayerChanges, 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayer])


  const onPrayerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(event.target.value)
    setPrayer(event.target.value)
  }

  const onBlur = () => {
    setIsTyping(false)
    savePrayerChanges()
  }

  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
      <ListItemAvatar>
        <CustomAvatar member={member} />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography>{getName(member)}</Typography>}
        secondary={
          reportMode === "prayer" ? (
            <TextField
              // InputProps={{ className: classes.textFieldInputProps }}
              fullWidth
              placeholder={localise({
                english: "Enter prayer request",
                korean: "기도제목을 입력해주세요",
              })}
              multiline
              rows={2}
              rowsMax={2}
              value={prayer}
              onChange={onPrayerChange}
              onFocus={() => {
                setIsTyping(true)
              }}
              onBlur={onBlur}
              helperText={prayer !== report.prayer && "Unsaved changes"}
            />
          ) : (
            <ToggleButtonGroup>
              <ToggleButton
                value="service"
                selected={attendance.service}
                onClick={() => {
                  setAttendance({
                    ...attendance,
                    service: !attendance.service,
                  })
                }}
              >
                {localise({ english: "Service", korean: "예배" })}
              </ToggleButton>
              <ToggleButton
                value="cell"
                selected={attendance.cell}
                onClick={() => {
                  setAttendance({
                    ...attendance,
                    cell: !attendance.cell,
                  })
                }}
              >
                {localise({ english: "Cell", korean: "셀" })}
              </ToggleButton>
              <ToggleButton
                value="all"
                selected={attendance.service && attendance.cell}
                onClick={() => {
                  const newAttendance =
                    attendance.service && attendance.cell
                      ? { ...attendance, service: false, cell: false }
                      : { ...attendance, service: true, cell: true }
                  setAttendance(newAttendance)
                }}
              >
                {localise({ english: "All", korean: "전체" })}
              </ToggleButton>
            </ToggleButtonGroup>
          )
        }
      />
      {reportMode === "prayer" && (
        <ListItemSecondaryAction>
          <ProfileMenu member={member} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
