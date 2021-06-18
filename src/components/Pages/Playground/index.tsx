import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { CELL_MEMBERS_DOWNLOAD } from "src/components/App"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { MembersReducer } from "src/store/reducers/membersReducer"
import { localise } from "src/utils/localisation"
import { membersDownloadToMembersWithId } from "src/utils/membersConversion"

import { AppState } from "../../../store/reducers/rootReducer"
import { INoticeWithMeta } from "../../../types"
import { Notices as NoticesGridList } from "../../Level2/GridLists/Notices"
import { DatesList } from "../../Level2/Lists/DatesList"
import { NoticeCreator } from "../../Level2/NoticeCreator"
import { Notices as NoticesSwipeable } from "../../Level2/SwipeableListViews/Notices"
import { GetNameInitialLetter } from "./GetNameInitialLetter"
import { MembersFilter } from "./MembersFilter"

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

  const noticesArr = useSelector<AppState, INoticeWithMeta[]>(
    (state) => state.firestore.ordered.notices
  )
  const membersReducer = useSelector<AppState, MembersReducer>((state) =>
    membersDownloadToMembersWithId(state.firestore.data[CELL_MEMBERS_DOWNLOAD])
  )

  const { data: membersDic, ordered: membersArr } = membersReducer

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
      <AppBarMain
        title={localise({ english: "Playground", korean: "놀이터" })}
      />
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
      </ContainerMain>
    </Fragment>
  )
}
