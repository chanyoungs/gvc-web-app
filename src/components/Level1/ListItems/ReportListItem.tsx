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
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ReportMode } from "src/components/Pages2/ReportsPage"
import { updateReport } from "src/store/actions/reportActions"
import { IMemberDownload, IReport } from "src/types"

import { ProfileEditDialog } from "../Dialogs/ProfileEditDialog"
import { ProfileMenu } from "../Menus/ProfileMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textFieldInputProps: {
      paddingBottom: 0, // Fixes styling break problem when switching between prayer<->attendance
    },
  })
)
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
  const [prayer, setPrayer] = useState<string>(report.prayer)
  const [attendance, setAttendance] = useState<IReport["attendance"]>({
    service: false,
    cell: false,
    info: "",
  })

  const classes = useStyles()

  useEffect(() => {
    setPrayer(report.prayer)
    setAttendance(report.attendance)
  }, [report])

  const AUTOSAVE_INTERVAL = 1000
  useEffect(() => {
    const timer = setTimeout(savePrayerChanges, AUTOSAVE_INTERVAL)
    return () => clearTimeout(timer)
  }, [prayer])

  const dispatch = useDispatch()

  const savePrayerChanges = () => {
    if (prayer !== report.prayer)
      dispatch(updateReport({ ...report, prayer: prayer }))
  }

  const onPrayerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
              InputProps={{ className: classes.textFieldInputProps }}
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
                  setAttendance((prevAttendance) => ({
                    ...prevAttendance,
                    service: !prevAttendance.service,
                  }))
                }}
              >
                예배
              </Button>
              <Button
                color={attendance.cell ? "primary" : undefined}
                // variant="contained"
                variant={attendance.cell ? "contained" : undefined}
                onClick={() => {
                  setAttendance((prevAttendance) => ({
                    ...prevAttendance,
                    cell: !prevAttendance.cell,
                  }))
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
                  setAttendance((prevAttendance) =>
                    prevAttendance.service && prevAttendance.cell
                      ? { ...prevAttendance, service: false, cell: false }
                      : { ...prevAttendance, service: true, cell: true }
                  )
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
