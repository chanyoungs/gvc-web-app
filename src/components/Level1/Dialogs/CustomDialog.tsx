import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import React, { FC } from "react"
import { localise } from "src/utils/localisation"

export interface CustomDialogProps {
  title?: string | JSX.Element
  content?: JSX.Element
  contentText?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
  open: boolean
  handleClose: () => void
  onExited?: () => void
}

export const CustomDialog: FC<CustomDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onExited={props.onExited}
    >
      {props.title && (
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      )}
      <DialogContent>
        {props.content}
        <DialogContentText id="alert-dialog-description">
          {props.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onCancel && props.onCancel()
            props.handleClose()
          }}
          color="secondary"
        >
          {props.cancelText || localise({ english: "CANCEL", korean: "취소" })}
        </Button>
        <Button
          onClick={() => {
            props.onConfirm()
            props.handleClose()
          }}
          color="secondary"
          autoFocus
        >
          {props.confirmText ||
            localise({ english: "CONFIRM", korean: "확정" })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
