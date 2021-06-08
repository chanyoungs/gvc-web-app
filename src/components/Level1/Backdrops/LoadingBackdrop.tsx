import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"

const useStyles = makeStyles<Theme, LoadingBackdropProps>((theme) =>
  createStyles({
    backdrop: {
      zIndex: (props) => props.zIndex || theme.zIndex.drawer + 1,
      color: (props) => (props.background === false ? undefined : "#fff"),
      background: (props) =>
        props.background === false ? "rgba(0, 0, 0, 0)" : undefined,
    },
  })
)

export interface LoadingBackdropProps {
  open?: boolean
  zIndex?: number
  background?: boolean
}

export const LoadingBackdrop: FC<LoadingBackdropProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Backdrop
      className={classes.backdrop}
      open={props.open === undefined ? true : props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
