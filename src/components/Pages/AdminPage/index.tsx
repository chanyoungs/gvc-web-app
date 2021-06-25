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
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { Searchbar } from "src/components/Level1/TextFields/Searchbar"
import { CellsList } from "src/components/Level2/Lists/CellsList"
import { filterMembersSearch, sortMembers } from "src/components/Level2/Lists/listUtils"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { updateMemberCell } from "src/store/actions/adminActions"
import { OPEN_CELL_ALLOCATION_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { getAllMembersWithIds } from "src/store/selectors/members"
import { CELL_UNASSIGNED_ID, ICells, IMembersWithIdCollection, IMemberWithId } from "src/types"
import { localise } from "src/utils/localisation"

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
  const [search, setSearch] = useState("")

  // Get members from Firestore
  useFirestoreConnect([
    {
      collection: "members",
    },
  ])

  const membersWithId = useSelector<AppState, IMembersWithIdCollection>(
    getAllMembersWithIds
  )
  const membersArr = Object.values(membersWithId)

  const cells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells.cells
  )

  const newMembersSorted =
    membersArr &&
    [...membersArr]
      .filter(
        (member) =>
          member.cell === CELL_UNASSIGNED_ID || !(member.cell in cells)
      )
      .sort(sortMembers)

  const membersFilteredSorted =
    membersArr &&
    [...membersArr]
      .filter(
        (member) =>
          filterMembersSearch(search)(member) &&
          member.cell !== CELL_UNASSIGNED_ID
      )
      .sort(sortMembers)

  return (
    <Fragment>
      <AppBarMain title={localise({ english: "Admin", korean: "관리자" })} />
      <ContainerMain>
        <Tabs
          className={classes.padding}
          variant="fullWidth"
          value={adminModeIndex}
          onChange={(event: React.ChangeEvent<{}>, value: number) =>
            setAdminModeIndex(value)
          }
        >
          <Tab
            label={localise({ english: "New Members", korean: "신규가입자" })}
          />
          <Tab
            label={localise({ english: "All Members", korean: "전체성도" })}
          />
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
                      dispatch({
                        type: OPEN_CELL_ALLOCATION_DIALOG,
                        payload: {
                          cellCurrent: member.cell,
                          cellRequest: member.cellRequest,
                          onConfirm: (chosenCellId: string) =>
                            dispatch(
                              updateMemberCell({
                                memberId: member.id,
                                newCellId: chosenCellId,
                              })
                            ),
                        },
                      })
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
