import Avatar from "@material-ui/core/Avatar"
import { red } from "@material-ui/core/colors"
import Container from "@material-ui/core/Container"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      maxHeight: 200,
    },
    avatarEdit: {
      background: theme.palette.common.white,
      color: theme.palette.background.default,
    },
    avatarMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
    },
    subheader: {
      background: theme.palette.background.default,
    },
    paper: {
      background: theme.palette.primary.main,
    },
    textEdit: {
      color: theme.palette.secondary.light,
    },
    textMember: {
      color: theme.palette.secondary.dark,
    },
    container: {
      padding: theme.spacing(0.5),
    },
  })
)

export interface MembersEditListProps {
  members: { name: string; dob: string }[]
}

export interface State {}

function MembersEditList(props: MembersEditListProps) {
  const classes = useStyles()
  const { members } = props
  return (
    <List className={classes.root} subheader={<li />}>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatarEdit}>
            <PersonAddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add cell member" className={classes.textEdit} />
      </ListItem>
      {members ? (
        members.map((member: MembersEditListProps["members"][0]) => {
          return (
            <Container className={classes.container} key={member.name}>
              <Paper className={classes.paper}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarMember}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    className={classes.textMember}
                  />
                  <Typography className={classes.textMember}>
                    {member.dob}
                  </Typography>
                </ListItem>
              </Paper>
            </Container>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </List>
  )
}

export { MembersEditList }
