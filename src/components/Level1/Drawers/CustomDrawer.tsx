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
import Switch from "@material-ui/core/Switch"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import LanguageIcon from "@material-ui/icons/Language"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import PaletteIcon from "@material-ui/icons/Palette"
import PeopleIcon from "@material-ui/icons/People"
import WidgetsIcon from "@material-ui/icons/Widgets"
import preval from "preval.macro"
import React, { FC, Fragment, useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { useHistory, useLocation } from "react-router-dom"
import { SET_DRAWER_OPEN, SET_DRAWER_TRANSITION } from "src/store/actions/types"
import { localise } from "src/utils/localisation"

import { signOut, updateLanguage } from "../../../store/actions/authActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { IMemberDownload, Language, Paths } from "../../../types"

const useStyles = makeStyles<Theme, { drawerWidth: number }>((theme: Theme) =>
  createStyles({
    divider: {
      // color: theme.palette.common.white,
      // background: theme.palette.common.white,
    },
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
      // ...theme.mixins.toolbar,
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
    version: {
      display: "flex",
      justifyContent: "center",
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

export interface CustomDrawerProps {}

export const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  const theme = useTheme()
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"))

  const setDrawerOpen = (open: boolean) => {
    dispatch({ type: SET_DRAWER_OPEN, payload: open })
  }
  const { drawerWidth, drawerOpen, drawerTransition } = useSelector<
    AppState,
    AppState["appBar"]
  >((state) => state.appBar)
  const classes = useStyles({ drawerWidth })

  const profile = useSelector<AppState, any>((state) => state.firebase.profile)
  const language = isLoaded(profile) ? profile.settings.language : "korean"

  const isAuthenticated = useSelector<AppState, boolean>(
    (state) => !state.firebase.auth.isEmpty
  )

  const isAdmin = useSelector<AppState, boolean>((state) =>
    state.firestore.data.access?.admins.admins.includes(state.firebase.auth.uid)
  )

  const items: Item[] = [
    {
      name: isAuthenticated
        ? localise({ english: "My Account", korean: "내 계정" })
        : localise({ english: "Sign In", korean: "로그인" }),
      icon: <Avatar src={profile.thumbnailUrl} />,
      page: isAuthenticated ? "/myaccount" : "/auth",
      divider: "below",
    },
    {
      name: localise({ english: "Admin", korean: "관리자" }),
      icon: <AssignmentIndIcon />,
      page: "/admin",
      disabled: !isAuthenticated || !isAdmin,
    },
    {
      name: localise({ english: "Members", korean: "멤버" }),
      icon: <PeopleIcon />,
      page: "/members",
      disabled: !isAuthenticated,
    },
    {
      name: localise({ english: "Reports", korean: "셀일기" }),
      icon: <LibraryBooksIcon />,
      page: "/reports",
      // page: "/dates",
      disabled: !isAuthenticated,
    },
    {
      name: localise({ english: "Notices", korean: "공지" }),
      icon: <AnnouncementIcon />,
      page: "/notices",
      disabled: !isAuthenticated,
    },
    {
      name: localise({ english: "Calendar", korean: "달력" }),
      icon: <CalendarTodayIcon />,
      page: "/calendar",
      disabled: !isAuthenticated,
    },
    {
      name: localise({ english: "Bible", korean: "성경" }),
      icon: <MenuBookIcon />,
      page: "/bible",
    },
    {
      name: localise({ english: "Bulletin", korean: "주보" }),
      icon: <FormatListBulletedIcon />,
      page: "/bulletin",
    },
    {
      name: localise({ english: "Playground", korean: "놀이터" }),
      icon: <WidgetsIcon />,
      page: "/playground",
      divider: "above",
    },
    {
      name: localise({ english: "Theme", korean: "테마" }),
      icon: <PaletteIcon />,
      page: "/theme",
    },
  ]

  const version = preval`module.exports =
  "Build: " +
  ("0" + new Date().getFullYear()).slice(-2) + "/" +
  ("0" + (new Date().getMonth() + 1)).slice(-2) + "/" +
  ("0" + new Date().getDate()).slice(-2) + " " +
  ("0" + new Date().getHours()).slice(-2) + ":" +
  ("0" + new Date().getMinutes()).slice(-2)`

  const d = new Date().toUTCString()
  return (
    <Drawer
      className={classes.drawer}
      variant={desktopMode ? "persistent" : "temporary"}
      anchor="left"
      open={drawerOpen}
      onClose={() => {
        if (!desktopMode) setDrawerOpen(false)
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
      SlideProps={{
        timeout: {
          enter: drawerTransition
            ? theme.transitions.duration.enteringScreen
            : 0,
          exit: theme.transitions.duration.leavingScreen,
        },
        onEntered: () => {
          if (desktopMode)
            dispatch({ type: SET_DRAWER_TRANSITION, payload: false })
        },
        onExited: () => {
          if (desktopMode)
            dispatch({ type: SET_DRAWER_TRANSITION, payload: true })
        },
      }}
    >
      <div
        className={classes.drawerContents}
        role="presentation"
        onClick={() => {
          if (!desktopMode) setDrawerOpen(false)
        }}
      >
        <List className={classes.list} color="inherit">
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
              {item.divider === "above" && (
                <Divider className={classes.divider} color="inherit" />
              )}
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
              {item.divider === "below" && (
                <Divider className={classes.divider} color="inherit" />
              )}
            </Fragment>
          ))}
        </List>
        {isAuthenticated && (
          <List>
            <ListItem
              button
              onClick={() => {
                dispatch(
                  updateLanguage({
                    memberId: profile.id,
                    language: language === "english" ? "korean" : "english",
                  })
                )
              }}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <LanguageIcon />
              </ListItemIcon>
              <Typography>한글</Typography>
              <Switch checked={language === "english"} color="default" />
              <Typography>ENG</Typography>
            </ListItem>

            <ListItem
              button
              onClick={() => {
                dispatch(signOut())
              }}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary={localise({ english: "Sign Out", korean: "로그아웃" })}
              />
            </ListItem>
            <ListItem className={classes.version}>
              <Typography variant="caption">{version}</Typography>
            </ListItem>
          </List>
        )}
      </div>
    </Drawer>
  )
}
