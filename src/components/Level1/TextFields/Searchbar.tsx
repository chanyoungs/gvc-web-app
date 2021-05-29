import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import React, { FC, Fragment } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    search: {
      paddingLeft: theme.spacing(1),
      display: "flex",
      alignItems: "center",
    },
    searchbar: {
      flex: 1,
    },
    icon: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
)

export interface SearchbarProps {
  setSearch: (search: string) => void
  addonElements: React.ReactNode[]
}

export const Searchbar: FC<SearchbarProps> = ({ setSearch, addonElements }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.search}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <InputBase
        className={classes.searchbar}
        onChange={(event) => {
          setSearch(event.target.value)
        }}
      />
      {addonElements.map((addonElement, i) => (
        <Fragment key={i}>{addonElement}</Fragment>
      ))}
    </Paper>
  )
}
