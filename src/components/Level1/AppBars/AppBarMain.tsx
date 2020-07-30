import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Slide from "@material-ui/core/Slide"
import { createStyles, fade, makeStyles, Theme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import EditIcon from "@material-ui/icons/Edit"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"

import { appBarSearchOnChange } from "../../../store/actions/appBarActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { SwipeableTemporaryDrawer } from "./../Drawers/SwipeableTemporaryDrawer"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },

    title: {
      flexGrow: 1,
      // paddingLeft: theme.spacing(1.5),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      // backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      // marginLeft: 0,
      // width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: 0,
      "&:focus": {
        width: "30vw",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        // width: 120,
        "&:focus": {
          width: 200,
          // width: "100%",
        },
      },
    },
    profile: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  })
)

export interface IPAppBarMain {
  title: React.ReactNode
}

export const AppBarMain: React.FC<IPAppBarMain> = ({ title }) => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    drawerOpen: false,
  })

  const dispatch = useDispatch()
  const search = useSelector<AppState, string>((state) => state.appBar.search)
  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  const setSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(appBarSearchOnChange(event.target.value))
  }

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setState({ drawerOpen: open })
  }

  return (
    <Fragment>
      <Slide appear={false} direction="down" in={!useScrollTrigger()}>
        <AppBar className={classes.appBar} position="sticky">
          <Toolbar disableGutters={!state.drawerOpen}>
            <IconButton
              aria-label="Open drawer"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} noWrap>
              {title}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={search}
                onChange={setSearch}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <IconButton>
              <Avatar src={profile.thumbnailUrl} className={classes.profile} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
      <SwipeableTemporaryDrawer
        drawerOpen={state.drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </Fragment>
  )
}
