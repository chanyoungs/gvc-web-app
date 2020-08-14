import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import React, { Fragment } from "react"

import { IMemberDownload, IPrayer } from "../../../types"
import { ProfileDialog } from "../Dialogs/ProfileDialog"
import { ProfileEditDialog } from "./../Dialogs/ProfileEditDialog"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.common.white,
      // display: "flex",
      // overflow: "auto",
      // flexDirection: "column",
      height: 200,
    },
    avatar: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      // padding: theme.spacing(1),
    },
    input: {
      color: theme.palette.secondary.main,
    },
    grid: {
      padding: theme.spacing(2),
    },
  })
)

export interface PrayerPaperProps {
  member: IMemberDownload
  prayer: IPrayer
}

export interface ISPrayerPaper {}

function PrayerPaper({ member, prayer }: PrayerPaperProps) {
  const classes = useStyles()
  const [values, setValues] = React.useState<ISPrayerPaper>({})

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item>
          <ProfileEditDialog member={member}>
            <Avatar
              className={classes.avatar}
              alt={member.name}
              src={member.thumbnailUrl}
            >
              <PersonIcon />
            </Avatar>
          </ProfileEditDialog>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="secondary" variant="h5">
                <b>{member.name}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="secondary">
                {member.dob.toDate().toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                fullWidth
                // id="standard-multiline-flexible"
                // label="Multiline"
                multiline
                rowsMax="4"
                value={prayer.content}
                // defaultValue="리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록."
                inputProps={{ className: classes.input }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { PrayerPaper }
