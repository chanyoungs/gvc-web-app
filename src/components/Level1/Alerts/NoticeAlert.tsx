import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import InfoIcon from "@material-ui/icons/Info"
import { Alert, AlertProps, AlertTitle } from "@material-ui/lab"
import React, { FC, ReactNode } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
)

interface IPNoticeAlert {
  title: string
  content: string
  severity: AlertProps["severity"]
  icon?: ReactNode
}

export const NoticeAlert: FC<IPNoticeAlert> = ({
  title,
  content,
  severity,
  icon,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert severity={severity} icon={icon} data-testid="Alert-component">
        <AlertTitle data-testid="AlertTitle-component">{title}</AlertTitle>
        {content}
      </Alert>
    </div>
  )
}
