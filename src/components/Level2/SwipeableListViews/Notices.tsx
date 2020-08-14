import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import SwipeableViews from "react-swipeable-views"

import { AppState } from "../../../store/reducers/rootReducer"
import { INoticeWithMeta } from "../../../types"
import { NoticePaper } from "../../Level1/Papers/NoticePaper"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    swipeableViews: {
      padding: "0 20px",
    },
    slideContainer: {
      padding: "0 0px",
    },
    slide: {
      padding: 10,
      height: "100%",
    },
  })
)

const slideStyle: object = {
  padding: "0 0px",
}

export interface NoticesProps {
  notices: INoticeWithMeta[]
}

export const Notices: FC<NoticesProps> = ({ notices }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SwipeableViews
        className={classes.swipeableViews}
        slideStyle={slideStyle}
      >
        {notices ? (
          // [....notices]
          //   // Sort the notices chronologically
          //   .sort((t1: INoticeWithMeta, t2: INoticeWithMeta) => {
          //     return t1.createdAt > t2.createdAt ? 1 : -1
          //   })
          notices.map((notice) => (
            <div key={notice.id} className={classes.slide}>
              <NoticePaper {...notice} />
            </div>
          ))
        ) : (
          <Typography>Loading Notices...</Typography>
        )}
      </SwipeableViews>
    </div>
  )
}
