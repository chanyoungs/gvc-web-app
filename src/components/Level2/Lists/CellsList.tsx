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
import { CELL_UNASSIGNED_ID, ICells, IMemberWithId } from "src/types"
import { languageRef, localise } from "src/utils/localisation"

import { sortMembers } from "./listUtils"
import { MembersList } from "./MembersList"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    cellButton: {
      width: "100%",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    buttonsContainer: {
      display: "flex",
    },
    expandAll: {
      flex: 1,
      marginRight: theme.spacing(1),
    },
    collapseAll: {
      flex: 1,
      marginLeft: theme.spacing(1),
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
  cells: ICells
  members: IMemberWithId[]
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
    Object.keys(cells).forEach((cell) => {
      allExpandedStates[cell] = true
      allCollapsedStates[cell] = false
    })
  const [expandedStates, setExpandedStates] = React.useState(allCollapsedStates)

  const handleExpandClick = (cell: string) => () => {
    setExpandedStates((es) => ({ ...es, [cell]: !es[cell] }))
  }

  return (
    <Fragment>
      <div className={classes.buttonsContainer}>
        <Button
          className={classes.expandAll}
          fullWidth
          variant="outlined"
          onClick={() => setExpandedStates(allExpandedStates)}
        >
          {localise({ english: "Expand All", korean: "모드 펼침" })}
        </Button>

        <Button
          className={classes.collapseAll}
          fullWidth
          variant="outlined"
          onClick={() => setExpandedStates(allCollapsedStates)}
        >
          {localise({ english: "Collapse All", korean: "모드 닫힘" })}
        </Button>
      </div>
      {cells &&
        Object.keys(cells)
          .filter((cellId) => cellId !== CELL_UNASSIGNED_ID)
          .map((cellId) => (
            <div key={cellId}>
              <ButtonBase
                onClick={handleExpandClick(cellId)}
                className={classes.cellButton}
              >
                <Grid container justify="space-between" alignItems="center">
                  <Typography variant="h6">
                    {languageRef.value === "korean"
                      ? `${cells[cellId].name}셀`
                      : `Cell ${cells[cellId].name}`}
                  </Typography>
                  <div
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expandedStates[cellId],
                    })}
                  >
                    <ExpandMoreIcon />
                  </div>
                </Grid>
              </ButtonBase>
              <Collapse
                in={expandedStates[cellId] || searching}
                timeout="auto"
                unmountOnExit
              >
                <MembersList
                  members={members
                    .filter((member) => member.cell === cellId)
                    .sort(sortMembers)}
                />
              </Collapse>
            </div>
          ))}
    </Fragment>
  )
}
