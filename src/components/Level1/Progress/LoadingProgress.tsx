import CircularProgress from "@material-ui/core/CircularProgress"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(10),
    },
  })
)

export const LoadingProgress: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
