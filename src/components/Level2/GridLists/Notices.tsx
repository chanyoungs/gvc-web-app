import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { FC, Fragment } from "react"

import { INoticeWithMeta } from "../../../types"
import { Notice } from "../../Level1/Papers/Notice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
      alignItems: "stretch",
    },
    gridListTile: {},
  })
)

export interface IPNotices {
  notices: INoticeWithMeta[]
}

export const Notices: FC<IPNotices> = ({ notices }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1.1}>
        {notices ? (
          notices.map(notice => (
            <GridListTile
              key={notice.id}
              className={classes.gridListTile}
              rows={0.8} // Height of the tile in number of grid cells.
            >
              <Notice {...notice} />
            </GridListTile>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </GridList>
    </div>
  )
}
