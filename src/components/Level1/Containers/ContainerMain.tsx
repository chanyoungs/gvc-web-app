import Container from "@material-ui/core/Container"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import clsx from "clsx"
import React, { PropsWithChildren } from "react"
import { useSelector } from "react-redux"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles<
  Theme,
  { drawerWidth: number; drawerTransition: boolean }
>((theme) =>
  createStyles({
    container: {
      width: "100%",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    containerShift: {
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
  })
)

export interface ContainerMainProps<C> {
  children: C
}

function ContainerMain<C>({
  children,
}: PropsWithChildren<ContainerMainProps<C>>) {
  const theme = useTheme()
  const { drawerWidth, drawerOpen, drawerTransition } = useSelector<
    AppState,
    AppState["appBar"]
  >((state) => state.appBar)
  const classes = useStyles({ drawerWidth, drawerTransition })
  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"))
  return (
    <div
      className={clsx({
        [classes.containerShift]: drawerOpen && desktopMode,
      })}
    >
      <Container maxWidth="xs" className={classes.container}>
        {children}
      </Container>
    </div>
  )
}

export { ContainerMain }
