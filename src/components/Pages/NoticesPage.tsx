import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { messaging } from "src/firebase"
import { localise } from "src/utils/localisation"

import { AppState } from "../../store/reducers/rootReducer"
import { EditNotice } from "../Level2/EditNotice"
import { NoticeCreator } from "../Level2/NoticeCreator"
import { Notifications } from "./Playground/Notifications"

export interface NoticesPageProps {}

export interface ISNoticesPage {}

export const NoticesPage: FC<NoticesPageProps> = (props) => {
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "desc"] },
  ])

  const noticesArr = useSelector<AppState, any>(
    (state) => state.firestore.ordered.notices
  )

  return (
    <Fragment>
      <AppBarMain title={localise({ english: "Notices", korean: "공지" })} />
      <ContainerMain>
        {messaging && <Notifications messaging={messaging} />}
        <NoticeCreator />
        <EditNotice notices={noticesArr} />
      </ContainerMain>
    </Fragment>
  )
}
