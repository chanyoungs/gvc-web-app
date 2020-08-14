import Avatar from "@material-ui/core/Avatar"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import EditIcon from "@material-ui/icons/Edit"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import React, { FC, Fragment } from "react"

import Image from "./../../../static/images/MinjungKang.jpg"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      // maxWidth: 500,
      background: theme.palette.common.white,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    cardHeaderTitle: {
      color: theme.palette.common.black,
    },
    cardHeaderSubheader: {
      color: theme.palette.secondary.main,
    },
    dialog: {
      width: "100%",
    },
  })
)

export interface ProfileDialogProps {
  children: React.ReactElement<any>
}

export const ProfileDialog: FC<ProfileDialogProps> = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      {React.cloneElement(children, { onClick: handleClickOpen })}
      <Dialog
        PaperProps={{ className: classes.dialog }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Card className={classes.card}>
          <CardHeader
            classes={{
              title: classes.cardHeaderTitle,
              subheader: classes.cardHeaderSubheader,
            }}
            action={
              <IconButton aria-label="settings" color="secondary">
                <EditIcon />
              </IconButton>
            }
            title="강민정"
            subheader="10th September 1990"
          />
          <CardMedia className={classes.media} image={Image} title="강민정" />
          <CardContent color="secondary">
            <Typography variant="body2" component="p">
              Positions: Cell leader
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Dialog>
    </Fragment>
  )
}
