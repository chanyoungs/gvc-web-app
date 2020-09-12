import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { ExtendedFirestoreInstance, useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { ReportListItem } from "src/components/Level1/ListItems/ReportListItem"

import { AppState } from "../../../store/reducers/rootReducer"
import { INoticeWithMeta } from "../../../types"
import { ProfileEditDialog } from "../../Level1/Dialogs/ProfileEditDialog"
import { PrayerPaper } from "../../Level1/Papers/PrayerPaper"
import { Notices as NoticesGridList } from "../../Level2/GridLists/Notices"
import { DatesList, DatesListProps } from "../../Level2/Lists/DatesList"
import { MembersEditList } from "../../Level2/Lists/MembersEditList"
import { MembersList, MembersListProps } from "../../Level2/Lists/MembersList"
import { NoticeCreator } from "../../Level2/NoticeCreator"
import { Notices as NoticesSwipeable } from "../../Level2/SwipeableListViews/Notices"
import { PrayersList } from "./../../Level2/Lists/PrayersList"
import { GetNameInitialLetter } from "./GetNameInitialLetter"
import { MembersFilter } from "./MembersFilter"
import { Notifications } from "./Notifications"
import { PrayersFilter } from "./PrayersFilter"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderColor: theme.palette.common.black,
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

interface Dates {
  from: Moment
  to: Moment
}

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

  const stateFS = useSelector<AppState, any>((state) => state.firestore)

  const noticesArr = stateFS.ordered.notices
  const membersDic = stateFS.data.members
  const membersArr = stateFS.ordered.members
  const prayersArr = stateFS.ordered.prayers

  const search = useSelector<AppState, string>((state) => state.appBar.search)

  const [dates, setDates] = useState<Dates>({
    from: moment("20200101", "YYYYMMDD"),
    to: moment(),
  })
  const changeDate = (dateType: keyof Dates) => (date: Date | null) => {
    if (date) {
      setDates({ ...dates, [dateType]: moment(date) })
    }
  }

  // const members: IPMembersEditList["members"] = [
  //   { name: "강민정", dob: new Date("1990/09/10") },
  //   { name: "권주은", dob: new Date("1995/12/25") },
  //   { name: "송인영", dob: new Date("1990/09/10") },
  //   { name: "임소민", dob: new Date("1995/12/25") },
  // ]

  return (
    <Fragment>
      <AppBarMain title="Playground" />
      <ContainerMain>
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
          <Notifications />
        </Container>

        <Typography>Dates</Typography>
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <DatePicker
                label={"From"}
                value={dates.from.toDate()}
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                views={["year", "month", "date"]}
                onChange={changeDate("from")}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label={"To"}
                value={dates.to.toDate()}
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                views={["year", "month", "date"]}
                onChange={changeDate("to")}
              />
            </Grid>
          </Grid>
          <DatesList from={dates.from} to={dates.to} />
        </Container>

        {/* <Typography>Members Edit Page</Typography>
      <Container className={classes.container}>
        <MembersEditList members={members} />
      </Container> */}
        <Typography>Members Edit Page With Grid</Typography>
        <Container className={classes.container}>
          {/* <MembersList members={members} /> */}
          <MembersFilter members={membersArr} filter={search} />
        </Container>

        <Typography>Korean to Korean initial</Typography>
        <Container className={classes.container}>
          <GetNameInitialLetter />
        </Container>

        <Typography>Prayers</Typography>
        <Container className={classes.container}>
          {/* <PrayerPaper /> */}
          {/* <PrayersList membersDic={membersDic} prayers={prayersArr} /> */}
          <PrayersFilter
            membersDic={membersDic}
            prayers={prayersArr}
            filter={search}
          />
        </Container>

        <Typography>Prayers Listitems</Typography>
        <Container className={classes.container}>
          {/* <PrayerListItem /> */}
        </Container>
      </ContainerMain>
    </Fragment>
  )
}
