import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Moment } from "moment"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { ReportListItem } from "src/components/Level1/ListItems/ReportListItem"
import { ReportMode } from "src/components/Pages/ReportsPage"
import { AppState } from "src/store/reducers/rootReducer"

import { IMemberDownload, IReport, IReports } from "../../../types"
import { CustomList } from "./CustomList"
import { filterMembersSearch } from "./listUtils"

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

export interface ReportsListProps {
  members: IMemberDownload[]
  reports: IReports
  date: Moment
  reportMode: ReportMode
  setIsTyping: (isTyping: boolean) => void
}

export const ReportsList: FC<ReportsListProps> = ({
  members,
  reports,
  date,
  reportMode,
  setIsTyping,
}) => {
  const classes = useStyles()
  const search = useSelector<AppState, string>((state) => state.appBar.search)

  const members_ = members && [...members].filter(filterMembersSearch(search))
  // .sort((member1, member2) => {
  //   return member1.name > member2.name ? 1 : -1
  // })

  const render = (member: IMemberDownload) => {
    const reportKey = `${date.format("YYYY.MM.DD")}-${member.id}`
    const reportDefault: IReport = {
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

    return (
      <ReportListItem
        report={(reports && reports[reportKey]) || reportDefault}
        member={member}
        key={member.id}
        reportMode={reportMode}
        setIsTyping={setIsTyping}
      />
    )
  }
  return (
    <CustomList
      items={members_}
      render={render}
      divider={reportMode === "attendance"}
    />
  )
}
