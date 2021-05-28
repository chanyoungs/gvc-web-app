import Divider from "@material-ui/core/Divider"
import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Typography from "@material-ui/core/Typography"
import SearchIcon from "@material-ui/icons/Search"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import SwipeableViews from "react-swipeable-views"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { CellsList } from "src/components/Level2/Lists/CellsList"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { Notices } from "src/components/Level2/SwipeableListViews/Notices"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload, INoticeWithMeta } from "src/types"

import { SortMenu } from "../../Level2/Menus/SortMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      paddingLeft: theme.spacing(1),
      display: "flex",
      alignItems: "center",
    },
    searchBar: {
      flex: 1,
    },
    icon: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    iconButton: {
      padding: 0,
    },
    padding: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
)

export interface AdminPageProps {}

export const AdminPage: FC<AdminPageProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [adminModeIndex, setAdminModeIndex] = useState(0)
  const [sortMode, setSortMode] = useState<"name" | "cell">("name")

  const [search, setSearch] = useState("")

  // Get notices from Firestore
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  // Get members from Firestore
  useFirestoreConnect([
    {
      collection: "members",
    },
  ])
  const stateFS = useSelector<AppState, any>((state) => state.firestore)
  const members: IMemberDownload[] = stateFS.ordered.members
  const notices: INoticeWithMeta[] = stateFS.ordered.notices

  const newMembersSorted =
    members &&
    [...members]
      .filter((member) => member.cell === "")
      .sort((member1, member2) => {
        return member1.name > member2.name ? 1 : -1
      })

  const membersFilteredSorted =
    members &&
    [...members]
      .filter(
        (member) =>
          member.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) && member.cell !== ""
      )
      .sort((member1, member2) => {
        return member1.name > member2.name ? 1 : -1
      })

  const cells: string[] =
    membersFilteredSorted &&
    Array.from(
      new Set(membersFilteredSorted.map((member) => member.cell).sort())
    )

  return (
    <Fragment>
      <AppBarMain title="Admin" />
      <ContainerMain>
        <Notices notices={notices} />
        <Tabs
          variant="fullWidth"
          value={adminModeIndex}
          onChange={(event: React.ChangeEvent<{}>, value: number) =>
            setAdminModeIndex(value)
          }
        >
          <Tab label="New Members" />
          <Tab label="All Members" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={adminModeIndex}
          onChangeIndex={setAdminModeIndex}
        >
          <MembersList members={newMembersSorted} />
          <Fragment>
            <div className={classes.padding}>
              <Paper className={classes.search}>
                <div className={classes.icon}>
                  <SearchIcon />
                </div>
                <InputBase
                  className={classes.searchBar}
                  onChange={(event) => {
                    setSearch(event.target.value)
                  }}
                />
                <Divider orientation="vertical" flexItem />
                <SortMenu handleClick={(choice) => () => setSortMode(choice)} />
              </Paper>
            </div>
            {search !== "" && membersFilteredSorted && (
              <Typography>{`${membersFilteredSorted.length} matching results`}</Typography>
            )}
            <div className={classes.padding}>
              {sortMode === "name" ? (
                <MembersList members={membersFilteredSorted} />
              ) : (
                <CellsList
                  cells={cells}
                  members={membersFilteredSorted}
                  searching={search !== ""}
                />
              )}
            </div>
          </Fragment>
        </SwipeableViews>
      </ContainerMain>
    </Fragment>
  )
}
