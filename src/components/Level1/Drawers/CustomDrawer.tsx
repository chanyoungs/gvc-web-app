import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import { SvgIconProps } from "@material-ui/core/SvgIcon"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import PaletteIcon from "@material-ui/icons/Palette"
import PeopleIcon from "@material-ui/icons/People"
import WidgetsIcon from "@material-ui/icons/Widgets"
import React, { FC, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { SET_DRAWER_OPEN } from "src/store/actions/types"

import { signOut } from "../../../store/actions/authActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { IMemberDownload, Paths } from "../../../types"

const useStyles = makeStyles<Theme, { drawerWidth: number }>((theme: Theme) =>
  createStyles({
    drawer: {
      width: (props) => props.drawerWidth,
      flexShrink: 0,
    },
    drawerContents: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    drawerPaper: {
      // width: drawerWidth,
      width: (props) => props.drawerWidth,
    },
    list: {
      flex: 1,
    },
    listItemIcon: {
      color: theme.palette.common.white,
    },
  })
)

type Item = {
  name: string
  icon: JSX.Element
  page: Paths
  divider?: "above" | "below"
  disabled?: boolean
}

export const CustomDrawer: FC = () => {
  const theme = useTheme()
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"))

  const setDrawerOpen = (open: boolean) => {
    dispatch({ type: SET_DRAWER_OPEN, payload: open })
  }
  const { drawerWidth, drawerOpen } = useSelector<AppState, AppState["appBar"]>(
    (state) => state.appBar
  )
  const classes = useStyles({ drawerWidth })

  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  const isAuthenticated = useSelector<AppState, boolean>(
    (state) => !state.firebase.auth.isEmpty
  )

  const items: Item[] = [
    {
      name: isAuthenticated ? "My Account" : "Sign In",
      icon: <Avatar src={profile.thumbnailUrl} />,
      page: isAuthenticated ? "/myaccount" : "/auth",
      divider: "below",
    },
    {
      name: "Members",
      icon: <PeopleIcon />,
      page: "/members",
      disabled: !isAuthenticated,
    },
    {
      name: "Reports",
      icon: <LibraryBooksIcon />,
      page: "/reports",
      // page: "/dates",
      disabled: !isAuthenticated,
    },
    {
      name: "Notices",
      icon: <AnnouncementIcon />,
      page: "/notices",
      disabled: !isAuthenticated,
    },
    {
      name: "Calendar",
      icon: <CalendarTodayIcon />,
      page: "/calendar",
      disabled: !isAuthenticated,
      divider: "below",
    },
    {
      name: "Bible",
      icon: <MenuBookIcon />,
      page: "/bible",
    },
    {
      name: "Bulletin",
      icon: <FormatListBulletedIcon />,
      page: "/bulletin",
    },
    {
      name: "Playground",
      icon: <WidgetsIcon />,
      page: "/playground",
    },
    {
      name: "Theme",
      icon: <PaletteIcon />,
      page: "/theme",
    },
  ]

  return (
    <Drawer
      className={classes.drawer}
      variant={desktopMode ? "persistent" : "temporary"}
      anchor="left"
      open={drawerOpen}
      onClose={() => {
        setDrawerOpen(false)
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div
        className={classes.drawerContents}
        role="presentation"
        onClick={() => {
          setDrawerOpen(false)
        }}
      >
        <List className={classes.list}>
          {desktopMode && (
            <div className={classes.drawerHeader}>
              <IconButton
                onClick={() => {
                  setDrawerOpen(false)
                }}
                color="inherit"
              >
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
          )}
          {items.map((item) => (
            <Fragment key={item.name}>
              {item.divider === "above" && <Divider />}
              <ListItem
                button
                onClick={() => history.push(item.page)}
                selected={item.page === location.pathname}
                disabled={item.disabled}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
              {item.divider === "below" && <Divider />}
            </Fragment>
          ))}
        </List>
        {isAuthenticated && (
          <List>
            <ListItem
              button
              onClick={() => {
                dispatch(signOut())
              }}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItem>
          </List>
        )}
      </div>
    </Drawer>
  )
}
