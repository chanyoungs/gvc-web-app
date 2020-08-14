import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { ReportListItem } from "src/components/Level1/ListItems/ReportListItem"

import { IMemberDownload, IPrayer } from "../../../types"
import { PrayerPaper } from "../../Level1/Papers/PrayerPaper"
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

export interface Props {
  membersDic: {
    [memberId: string]: IMemberDownload
  }
  prayers: IPrayer[]
  filter: string
}

export const PrayersList: FC<Props> = ({ membersDic, prayers, filter }) => {
  const classes = useStyles()

  const prayers_ =
    prayers &&
    [...prayers]
      .filter(
        (p) =>
          !!membersDic[p.memberId] &&
          membersDic[p.memberId].name
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
      )
      .sort((p1: IPrayer, p2: IPrayer) => {
        return membersDic[p1.memberId].name > membersDic[p2.memberId].name
          ? 1
          : -1
      })

  return (
    <CustomList
      items={prayers_}
      render={(prayer) => (
        <ListItem key={prayer.id}>
          <PrayerPaper prayer={prayer} member={membersDic[prayer.memberId]} />
        </ListItem>
      )}
    />
  )
}
