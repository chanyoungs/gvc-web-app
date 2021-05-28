import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Collapse from "@material-ui/core/Collapse"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import clsx from "clsx"
import React, { FC, Fragment, useState } from "react"
import { IMemberDownload } from "src/types"

import { MembersList } from "./MembersList"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    cellButton: {
      width: "100%",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
)

export interface CellsListProps {
  cells: string[]
  members: IMemberDownload[]
  searching: boolean
}

export const CellsList: FC<CellsListProps> = ({
  cells,
  members,
  searching,
}) => {
  const classes = useStyles()

  const allExpandedStates: { [key: string]: boolean } = {}
  const allCollapsedStates: { [key: string]: boolean } = {}
  cells &&
    cells.forEach((cell) => {
      allExpandedStates[cell] = true
      allCollapsedStates[cell] = false
    })
  const [expandedStates, setExpandedStates] = React.useState(allCollapsedStates)

  const handleExpandClick = (cell: string) => () => {
    setExpandedStates((es) => ({ ...es, [cell]: !es[cell] }))
  }

  const membersByCell: { [key: string]: IMemberDownload[] } = {}

  Object.keys(cells).forEach((cell) => {
    membersByCell[cell] = members
      .filter((member) => member.cell === cell)
      .sort((member1, member2) => (member1.name > member2.name ? 1 : -1))
  })

  return (
    <Fragment>
      <Grid container justify="space-around">
        <Button
          variant="outlined"
          onClick={() => setExpandedStates(allExpandedStates)}
        >
          Expand All
        </Button>
        <Button
          variant="outlined"
          onClick={() => setExpandedStates(allCollapsedStates)}
        >
          Collapse All
        </Button>
      </Grid>
      {cells.map((cell) => (
        <div>
          <ButtonBase
            onClick={handleExpandClick(cell)}
            className={classes.cellButton}
          >
            <Grid container justify="space-between" alignItems="center">
              <Typography variant="h6">{`Cell ${cell}`}</Typography>
              <div
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expandedStates[cell],
                })}
              >
                <ExpandMoreIcon />
              </div>
            </Grid>
          </ButtonBase>
          <Collapse
            in={expandedStates[cell] || searching}
            timeout="auto"
            unmountOnExit
          >
            <MembersList
              members={members
                .filter((member) => member.cell === cell)
                .sort((member1, member2) =>
                  member1.name > member2.name ? 1 : -1
                )}
            />
          </Collapse>
        </div>
      ))}
    </Fragment>
  )
}
