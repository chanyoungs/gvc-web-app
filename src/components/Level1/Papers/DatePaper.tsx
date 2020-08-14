import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import moment, { Moment } from "moment"
import React, { FC, Fragment } from "react"

import { IMemberDownload } from "../../../types"

// import { IMember } from "./../../../interfaces"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      // padding: theme.spacing(1),
    },
    paper: {
      background: theme.palette.primary.main,
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    textMember: {
      color: theme.palette.secondary.dark,
    },
  })
)

export interface DatePaperProps {
  date: Moment
}

export const DatePaper: FC<DatePaperProps> = ({ date }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      {date ? (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar className={classes.avatar}>80%</Avatar>
          </Grid>
          <Grid item xs>
            <Typography className={classes.textMember} align="left">
              {date.format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Typography className={classes.textMember} align="right">
            8/10
          </Typography>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  )
}
