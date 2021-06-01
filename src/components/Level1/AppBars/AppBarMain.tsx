import AppBar, { AppBarProps } from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Slide from "@material-ui/core/Slide"
import { createStyles, fade, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import EditIcon from "@material-ui/icons/Edit"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import ShareIcon from "@material-ui/icons/Share"
import clsx from "clsx"
import React, { Fragment, ReactNode, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomAvatar } from "src/components/Level2/Avatars/CustomAvatar"
import { SET_DRAWER_OPEN, SET_DRAWER_TRANSITION } from "src/store/actions/types"
import { IMemberDownload } from "src/types"

import { appBarSearchOnChange } from "../../../store/actions/appBarActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { CustomDrawer } from "../Drawers/CustomDrawer"

const useStyles = makeStyles<
  Theme,
  { drawerWidth: number; drawerTransition: boolean }
>((theme) =>
  createStyles({
    appBar: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: (props) => `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: (props) => props.drawerWidth,
      transition: (props) =>
        theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: props.drawerTransition
            ? theme.transitions.duration.enteringScreen
            : 0,
        }),
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
    hide: {
      display: "none",
    },
    menuButton: {
      marginRight: theme.spacing(2),
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

export interface AppBarMainProps {
  title: React.ReactNode
  color?: AppBarProps["color"]
  toolbar?: ReactNode
  onShare?: () => void
  searchBar?: boolean
}

export const AppBarMain: React.FC<AppBarMainProps> = ({
  title,
  color,
  toolbar,
  onShare,
  searchBar,
}) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const profile = useSelector<AppState, any>((state) => state.firebase.profile)
  const { drawerWidth, drawerOpen, drawerTransition, search } = useSelector<
    AppState,
    AppState["appBar"]
  >((state) => state.appBar)
  const setDrawerOpen = (open: boolean) => {
    dispatch({ type: SET_DRAWER_OPEN, payload: open })
  }

  const classes = useStyles({ drawerWidth, drawerTransition })

  const setSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(appBarSearchOnChange(event.target.value))
  }

  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"))
  return (
    <Fragment>
      <Slide appear={false} direction="down" in={!useScrollTrigger()}>
        <AppBar
          color={color}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen && desktopMode,
          })}
          position="sticky"
        >
          {toolbar || (
            <Toolbar>
              <IconButton
                aria-label="Open drawer"
                onClick={() => {
                  setDrawerOpen(true)
                }}
                color="inherit"
                edge="start"
                className={clsx(
                  classes.menuButton,
                  drawerOpen && desktopMode && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} noWrap>
                {title}
              </Typography>
              {searchBar && (
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
              )}
              {onShare && (
                <IconButton onClick={onShare} color="inherit">
                  <ShareIcon color="inherit" />
                </IconButton>
              )}
              {profile && (
                <CustomAvatar
                  member={profile as IMemberDownload}
                  size={3}
                  padding
                />
              )}
            </Toolbar>
          )}
        </AppBar>
      </Slide>
      <CustomDrawer />
    </Fragment>
  )
}
