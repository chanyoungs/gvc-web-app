import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Moment } from "moment"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { PrayerListItem } from "src/components/Level1/ListItems/PrayerListItem"
import { AppState } from "src/store/reducers/rootReducer"

import { IMemberDownload, IReport } from "../../../types"
import { CustomList } from "./CustomList"

// import { Iprayer } from "./../../../interfaces"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      // maxHeight: 400,
    },

    subheader: {
      background: theme.palette.background.default,
    },
    paper: {
      background: theme.palette.primary.main,
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    textEdit: {
      color: theme.palette.secondary.light,
    },
    textprayer: {
      color: theme.palette.secondary.dark,
    },

    listItem: {
      padding: theme.spacing(0.5),
    },
  })
)

export interface IPPrayersContainer {
  members: IMemberDownload[]
  reports: IReport[]
  date: Moment
}

export const PrayersContainer: FC<IPPrayersContainer> = ({
  members,
  reports,
  date,
}) => {
  const classes = useStyles()
  const search = useSelector<AppState, string>((state) => state.appBar.search)

  const members_ =
    members &&
    [...members].filter((member) =>
      member.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  // .sort((member1, member2) => {
  //   return member1.name > member2.name ? 1 : -1
  // })

  const render = (member: IMemberDownload) => {
    let _report: IReport
    let query =
      reports && reports.filter((report) => report.memberId === member.id)

    _report =
      query && query.length === 1
        ? query[0]
        : {
            memberId: member.id,
            prayer: "",
            cell: member.cell,
            date: date.format("YYYY.MM.DD"),
            attendance: {
              service: false,
              cell: false,
              info: "",
            },
          }

    return <PrayerListItem report={_report} member={member} key={member.id} />
  }
  return <CustomList items={members_} render={render} />
}
