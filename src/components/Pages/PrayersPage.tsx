import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

import { AppState } from "../../store/reducers/rootReducer"
import { PrayersList } from "../Level2/Lists/PrayersList"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface PrayersPageProps {}

export const PrayersPage: FC<PrayersPageProps> = (props) => {
  const classes = useStyles()

  const profile = useSelector<AppState, any>((state) => state.firebase.profile)
  const prayerQueries = useSelector<AppState, any>(
    (state) => state.prayers.queries
  )

  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  useFirestoreConnect([
    {
      collection: "members",
      where: ["cell", "==", profile.cell ? profile.cell : ""],
    },
  ])

  useFirestoreConnect([
    {
      collection: "prayers",
      where: [
        ...prayerQueries,
        ["cell", "==", profile.cell ? profile.cell : ""],
      ],
    },
  ])

  const stateFS = useSelector<AppState, any>((state) => state.firestore)

  const noticesArr = stateFS.ordered.notices
  const membersDic = stateFS.data.members
  const prayersArr = stateFS.ordered.prayers

  const search = useSelector<AppState, string>((state) => state.appBar.search)

  return (
    <Fragment>
      <AppBarMain title="Prayers" />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <PrayersList
          prayers={prayersArr}
          membersDic={membersDic}
          filter={search}
        />
      </ContainerMain>
    </Fragment>
  )
}
