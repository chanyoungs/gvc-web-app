import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListSubheader from "@material-ui/core/ListSubheader"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { Fragment, ReactNode } from "react"

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
  divider?: boolean
}

function CustomList<I>({ items, render, divider }: IPCustomList<I>) {
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
                  {item.subitems.map((item) => (
                    <Fragment>
                      {render(item)}
                      {divider && <Divider variant="inset" component="li" />}
                    </Fragment>
                  ))}
                </ul>
              </li>
            ) : (
              <Fragment>
                {render(item)}
                {divider && <Divider variant="inset" component="li" />}
              </Fragment>
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
