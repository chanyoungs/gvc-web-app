import Avatar from "@material-ui/core/Avatar"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import React, { FC, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomAvatar } from "src/components/Level2/Avatars/CustomAvatar"
import { getName } from "src/components/Level2/Lists/listUtils"
import { ProfileMenu } from "src/components/Level2/Menus/ProfileMenu"
import { ReportMode } from "src/components/Pages/ReportsPage"
import { getReportDocId, updateAttendance, updatePrayer, updateReport, uploadReport } from "src/store/actions/reportActions"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload, IReport } from "src/types"

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
  member: IMemberDownload
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
  const setPrayer = (prayer: string) => {
    if (reportLocal) dispatch(updateReport({ ...reportLocal, prayer }))
  }
  const setAttendance = (attendance: IReport["attendance"]) => {
    if (reportLocal) {
      const newReport = { ...reportLocal, attendance }
      dispatch(updateReport(newReport))
      dispatch(uploadReport(newReport, false))
    }
  }

  useEffect(() => {
    dispatch(updateReport(report))
  }, [])

  useEffect(() => {
    setPrayer(report.prayer)
  }, [report.prayer])

  useEffect(() => {
    if (reportLocal)
      dispatch(updateReport({ ...reportLocal, attendance: report.attendance }))
  }, [
    report.attendance.cell,
    report.attendance.service,
    report.attendance.info,
  ])

  useEffect(() => {
    const timer = setTimeout(savePrayerChanges, 1000)
    return () => clearTimeout(timer)
  }, [prayer])

  const savePrayerChanges = () => {
    if (prayer !== report.prayer) dispatch(uploadReport({ ...report, prayer }))
  }

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
              placeholder="기도제목을 입력해주세요"
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
                예배
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
                셀
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
                전체
              </ToggleButton>
            </ToggleButtonGroup>
          )
        }
      />
      {reportMode === "prayer" && (
        <ListItemSecondaryAction>
          <ProfileMenu memberId={member.id} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
