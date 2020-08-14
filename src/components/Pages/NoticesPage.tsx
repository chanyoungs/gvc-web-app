import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

import { AppState } from "../../store/reducers/rootReducer"
import { EditNotice } from "../Level2/EditNotice"
import { NoticeCreator } from "../Level2/NoticeCreator"

export interface NoticesPageProps {}

export interface ISNoticesPage {}

export const NoticesPage: FC<NoticesPageProps> = (props) => {
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  const noticesArr = useSelector<AppState, any>(
    (state) => state.firestore.ordered.notices
  )

  return (
    <Fragment>
      <AppBarMain title="Notices" />
      <ContainerMain>
        <NoticeCreator />
        <EditNotice notices={noticesArr} />
      </ContainerMain>
    </Fragment>
  )
}
