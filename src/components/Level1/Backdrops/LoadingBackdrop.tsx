import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      // color: "#fff",
      background: "rgba(0, 0, 0, 0)",
    },
  })
)

export interface LoadingBackdropProps {
  open?: boolean
}

export const LoadingBackdrop: FC<LoadingBackdropProps> = ({ open }) => {
  const classes = useStyles()

  return (
    <Backdrop
      className={classes.backdrop}
      open={open === undefined ? true : open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
