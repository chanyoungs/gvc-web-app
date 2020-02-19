import Container from "@material-ui/core/Container"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"

import { ProfileEditDialog } from "../../Level1/Dialogs/ProfileEditDialog"
import { PrayerPaper } from "../../Level1/Papers/PrayerPaper"
import { Notices as NoticesGridList } from "../../Level2/GridLists/Notices"
import { DatesList, IPDatesList } from "../../Level2/Lists/DatesList"
import { MembersEditList } from "../../Level2/Lists/MembersEditList"
import { MembersList, Props as IPMembersList } from "../../Level2/Lists/MembersList"
import { NoticeCreator } from "../../Level2/NoticeCreator"
import { Notices as NoticesSwipeable } from "../../Level2/SwipeableListViews/Notices"
import { AppBarMain } from "./../../Level1/AppBars/AppBarMain"
import { ContainerMain } from "./../../Level1/Containers/ContainerMain"
import { PrayersList } from "./../../Level2/Lists/PrayersList"
import { GetNameInitialLetter } from "./GetNameInitialLetter"
import { MembersFilter } from "./MembersFilter"
import { PrayersFilter } from "./PrayersFilter"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderColor: theme.palette.common.white,
      borderWidth: 2,
      borderStyle: "solid",
      marginBottom: 50,
      padding: theme.spacing(1),
    },
    IconButtonEditMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      padding: theme.spacing(1),
    },
  })
)

export const Playground: FC = () => {
  const classes = useStyles()

  // // Get notices from Firestore
  // useFirestoreConnect([
  //   { collection: "notices", orderBy: ["createdAt", "asc"] },
  // ])
  // const notices = useSelector(
  //   (state: { firestore: any }) => state.firestore.ordered.notices
  // )

  // // Get members from Firestore
  // useFirestoreConnect("members")
  // const members = useSelector(
  //   (state: { firestore: any }) => state.firestore.ordered.members
  // )

  // Get notices from Firestore
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])
  // Get members from Firestore
  useFirestoreConnect("members")

  // Get prayers from Firestore
  useFirestoreConnect("prayers")

  const stateFS = useSelector((state: { firestore: any }) => state.firestore)

  const noticesArr = stateFS.ordered.notices
  const membersDic = stateFS.data.members
  const membersArr = stateFS.ordered.members
  const prayersArr = stateFS.ordered.prayers

  const dates: IPDatesList["dates"] = [
    ["January 2020", ["01.01.20", "02.01.20"]],
    ["February 2020", ["01.02.20", "02.02.20"]],
    ["March 2020", ["01.03.20", "02.03.20"]],
    ["April 2020", ["01.04.20", "02.04.20"]],
  ]

  // const members: IPMembersEditList["members"] = [
  //   { name: "강민정", dob: new Date("1990/09/10") },
  //   { name: "권주은", dob: new Date("1995/12/25") },
  //   { name: "송인영", dob: new Date("1990/09/10") },
  //   { name: "임소민", dob: new Date("1995/12/25") },
  // ]

  return (
    <ContainerMain>
      <AppBarMain />
      {/* <Toolbar /> */}
      <Typography>Notices in scrollable Grid List</Typography>
      <Container className={classes.container}>
        <NoticesGridList notices={noticesArr} />
      </Container>

      <Typography>Notices in Swipeable List View</Typography>
      <Container className={classes.container}>
        <NoticesSwipeable notices={noticesArr} />
      </Container>

      <Typography>Notice creator</Typography>
      <Container className={classes.container}>
        <NoticeCreator />
      </Container>

      <Typography>Dates</Typography>
      <Container className={classes.container}>
        <DatesList dates={dates} />
      </Container>

      {/* <Typography>Members Edit Page</Typography>
      <Container className={classes.container}>
        <MembersEditList members={members} />
      </Container> */}
      <Typography>Members Edit Page With Grid</Typography>
      <Container className={classes.container}>
        {/* <MembersList members={members} /> */}
        <MembersFilter members={membersArr} />
      </Container>

      <Typography>Korean to Korean initial</Typography>
      <Container className={classes.container}>
        <GetNameInitialLetter />
      </Container>

      <Typography>Prayers</Typography>
      <Container className={classes.container}>
        {/* <PrayerPaper /> */}
        {/* <PrayersList membersDic={membersDic} prayers={prayersArr} /> */}
        <PrayersFilter membersDic={membersDic} prayers={prayersArr} />
      </Container>

      <Typography>Profile Edit Dialog</Typography>
      <Container className={classes.container}>
        <ProfileEditDialog>
          <IconButton className={classes.IconButtonEditMember}>
            <PersonIcon />
          </IconButton>
        </ProfileEditDialog>
      </Container>
    </ContainerMain>
  )
}