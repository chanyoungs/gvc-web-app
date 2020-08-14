import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import React, { FC, Fragment } from "react"

export interface ConfirmDialogProps {
  title: string | JSX.Element
  content?: JSX.Element
  contentText?: string
  onConfirm: () => void
}

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <ButtonBase
        onClick={handleClickOpen}
        // className={classes.buttonBaseChildren}
      >
        {props.children}
      </ButtonBase>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {props.content}
          <DialogContentText id="alert-dialog-description">
            {props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button
            onClick={() => {
              props.onConfirm()
              handleClose()
            }}
            color="primary"
            autoFocus
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
