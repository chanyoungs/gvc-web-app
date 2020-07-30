import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SvgIconProps } from "@material-ui/core/SvgIcon"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import PaletteIcon from "@material-ui/icons/Palette"
import PeopleIcon from "@material-ui/icons/People"
import WidgetsIcon from "@material-ui/icons/Widgets"
import React, { FC, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"

import { signOut } from "../../../store/actions/authActions"
import { AppState } from "../../../store/reducers/rootReducer"
import { IMemberDownload, Paths } from "../../../types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 250,
      // width: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    list: {
      flex: 1,
    },
    listItemIcon: {
      color: theme.palette.common.white,
    },
  })
)

interface Props {
  drawerOpen: boolean
  toggleDrawer: (open: boolean) => (event: React.MouseEvent) => void
}

type Item = {
  name: string
  icon: JSX.Element
  page: Paths
  divider?: "above" | "below"
  disabled?: boolean
}

export const SwipeableTemporaryDrawer: FC<Props> = ({
  drawerOpen,
  toggleDrawer,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
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
      name: "Prayers",
      icon: <LibraryBooksIcon />,
      page: "/prayers2",
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
    <SwipeableDrawer
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={classes.drawer}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List className={classes.list}>
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
    </SwipeableDrawer>
  )
}
