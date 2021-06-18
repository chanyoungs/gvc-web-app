import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Typography from "@material-ui/core/Typography"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import SwipeableViews from "react-swipeable-views"
import { CELL_MEMBERS_DOWNLOAD } from "src/components/App"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { Searchbar } from "src/components/Level1/TextFields/Searchbar"
import { CellAllocationDialog } from "src/components/Level2/Dialogs/CellAllocationDialog"
import { CellsList } from "src/components/Level2/Lists/CellsList"
import { filterMembersSearch, sortMembers } from "src/components/Level2/Lists/listUtils"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { updateMemberCell } from "src/store/actions/adminActions"
import { AppState } from "src/store/reducers/rootReducer"
import { CELL_UNASSIGNED_ID, ICells, IMemberDownload, IMemberWithId } from "src/types"
import { membersDownloadToMembersWithId } from "src/utils/membersConversion"

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
    checkIcon: {
      color: "#2196F3",
    },
    closeIcon: {
      color: theme.palette.secondary.main,
    },
  })
)

export interface AdminPageProps {}

export const AdminPage: FC<AdminPageProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const [adminModeIndex, setAdminModeIndex] = useState(0)
  const [sortMode, setSortMode] = useState<"name" | "cell">("name")
  const [chosenMember, setChosenMember] = useState<IMemberWithId | null>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [search, setSearch] = useState("")

  // Get members from Firestore
  useFirestoreConnect([
    {
      collection: "members",
    },
  ])

  const membersWithId = useSelector<AppState, any>(
    (state) =>
      membersDownloadToMembersWithId(state.firestore.data.members).ordered
  )

  const cells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells.cells
  )

  const newMembersSorted =
    membersWithId &&
    [...membersWithId]
      .filter(
        (member) =>
          member.cell === CELL_UNASSIGNED_ID || !(member.cell in cells)
      )
      .sort(sortMembers)

  const membersFilteredSorted =
    membersWithId &&
    [...membersWithId]
      .filter(
        (member) =>
          filterMembersSearch(search)(member) &&
          member.cell !== CELL_UNASSIGNED_ID
      )
      .sort(sortMembers)

  return (
    <Fragment>
      {chosenMember && (
        <CellAllocationDialog
          cellCurrent={chosenMember.cell}
          cellRequest={chosenMember.cellRequest}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          onConfirm={(chosenCellId) =>
            dispatch(
              updateMemberCell({
                memberId: chosenMember.id,
                newCellId: chosenCellId,
              })
            )
          }
        />
      )}
      <AppBarMain title="Admin" />
      <ContainerMain>
        <Tabs
          className={classes.padding}
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
          <div className={classes.padding}>
            <MembersList
              members={newMembersSorted}
              secondaryAction={(member: IMemberWithId) => (
                <Fragment>
                  <IconButton
                    onClick={() => {
                      setChosenMember(member)
                      setOpenDialog(true)
                    }}
                  >
                    <CheckIcon className={classes.checkIcon} />
                  </IconButton>
                  <IconButton>
                    <CloseIcon className={classes.closeIcon} />
                  </IconButton>
                </Fragment>
              )}
            />
          </div>
          <Fragment>
            <div className={classes.padding}>
              <Searchbar
                setSearch={setSearch}
                addonElements={[
                  <Divider orientation="vertical" flexItem />,
                  <SortMenu
                    handleClick={(choice) => () => setSortMode(choice)}
                  />,
                ]}
              />
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
