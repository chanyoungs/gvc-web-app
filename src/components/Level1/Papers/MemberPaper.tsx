import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
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

export interface MemberPaperProps {
  member: IMemberDownload
  editMode: boolean
}

export const MemberPaper: FC<MemberPaperProps> = ({
  member: { id, name, dob, cell, positions, photoUrl, thumbnailUrl },
  editMode,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      {id ? (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar className={classes.avatar} alt={name} src={thumbnailUrl}>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography className={classes.textMember} align="left">
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.textMember} align="right">
              {dob.toDate().toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  )
}
