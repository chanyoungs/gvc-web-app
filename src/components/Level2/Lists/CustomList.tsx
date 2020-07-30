import List from "@material-ui/core/List"
import { ListItemProps } from "@material-ui/core/ListItem"
import ListSubheader from "@material-ui/core/ListSubheader"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { ReactNode } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: { width: "100%", overflow: "auto" },
    ul: { padding: 0 },
    subheader: { background: theme.palette.background.default },
  })
)

export interface IPCustomList<I> {
  items: I[] | { subheader: string; subitems: I[] }[]
  render: (item: I) => ReactNode
}

function CustomList<I>({ items, render }: IPCustomList<I>) {
  const classes = useStyles()
  return (
    <List className={classes.list} subheader={<li />}>
      {items ? (
        (items as Array<I | { subheader: string; subitems: I[] }>).map(
          (item: I | { subheader: string; subitems: I[] }) => {
            return "subheader" in item ? (
              <li key={item.subheader}>
                <ul className={classes.ul}>
                  <ListSubheader className={classes.subheader}>
                    <Typography align="center">{item.subheader}</Typography>
                  </ListSubheader>
                  {item.subitems.map(render)}
                </ul>
              </li>
            ) : (
              render(item)
            )
          }
        )
      ) : (
        <p>Loading...</p>
      )}
    </List>
  )
}

export { CustomList }
