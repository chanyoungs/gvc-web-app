import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import { Moment } from "moment"
import React, { FC, Fragment, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReportMode } from "src/components/Pages2/ReportsPage"
import { updateAttendance, updatePrayer, updateReport, uploadReport } from "src/store/actions/reportActions"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload, IReport } from "src/types"

import { ProfileEditDialog } from "../Dialogs/ProfileEditDialog"
import { ProfileMenu } from "../Menus/ProfileMenu"

const useStyles = makeStyles((theme: Theme) => createStyles({}))
export interface ReportListItem {
  member: IMemberDownload
  report: IReport
  reportMode: ReportMode
}

export const ReportListItem: FC<ReportListItem> = ({
  member,
  report,
  reportMode,
}) => {
  const classes = useStyles()

  const reportLocal = useSelector<AppState, IReport | undefined>(
    (state) => state.reports[member.id]
  )

  const prayer = reportLocal ? reportLocal.prayer : report.prayer
  const attendance = reportLocal ? reportLocal.attendance : report.attendance

  const dispatch = useDispatch()
  const setPrayer = useCallback(
    (prayer: string) => dispatch(updateReport({ ...report, prayer })),
    []
  )
  const setAttendance = useCallback(
    (attendance: IReport["attendance"]) =>
      dispatch(updateReport({ ...report, attendance })),
    []
  )

  useEffect(() => {
    dispatch(updateReport(report))
  }, [])

  useEffect(() => {
    setPrayer(report.prayer)
  }, [report.prayer])

  const { cell, service, info } = report.attendance
  useEffect(() => {
    setAttendance(report.attendance)
  }, [cell, service, info])

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
    savePrayerChanges()
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <ProfileEditDialog member={member}>
          <Avatar alt={member.name} src={member.thumbnailUrl} />
        </ProfileEditDialog>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography>{member.name}</Typography>}
        secondary={
          reportMode === "prayer" ? (
            <TextField
              fullWidth
              placeholder="기도제목을 입력해주세요"
              multiline
              rows={2}
              rowsMax={2}
              value={prayer}
              onChange={onPrayerChange}
              onBlur={onBlur}
              helperText={prayer !== report.prayer && "Unsaved changes"}
            />
          ) : (
            <ButtonGroup fullWidth>
              <Button
                color={attendance.service ? "primary" : undefined}
                variant={attendance.service ? "contained" : undefined}
                // variant="contained"
                onClick={() => {
                  setAttendance({
                    ...attendance,
                    service: !attendance.service,
                  })
                }}
              >
                예배
              </Button>
              <Button
                color={attendance.cell ? "primary" : undefined}
                // variant="contained"
                variant={attendance.cell ? "contained" : undefined}
                onClick={() => {
                  setAttendance({
                    ...attendance,
                    cell: !attendance.cell,
                  })
                }}
              >
                셀모임
              </Button>
              <Button
                color={
                  attendance.service && attendance.cell ? "primary" : undefined
                }
                // variant="contained"
                variant={
                  attendance.service && attendance.cell
                    ? "contained"
                    : undefined
                }
                onClick={() => {
                  const newAttendance =
                    attendance.service && attendance.cell
                      ? { ...attendance, service: false, cell: false }
                      : { ...attendance, service: true, cell: true }
                  setAttendance(newAttendance)
                }}
              >
                전체
              </Button>
            </ButtonGroup>
          )
        }
      />
      {reportMode === "prayer" && (
        <ListItemSecondaryAction>
          <ProfileMenu edge="end" />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
