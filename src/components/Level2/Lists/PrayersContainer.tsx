import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Moment } from "moment"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { PrayerListItem } from "src/components/Level1/ListItems/PrayerListItem"
import { AppState } from "src/store/reducers/rootReducer"

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

export interface IPPrayersContainer {
  members: IMemberDownload[]
  prayers: IPrayer[]
  date: Moment
}

export const PrayersContainer: FC<IPPrayersContainer> = ({
  members,
  prayers,
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
    let prayer: IPrayer
    let query =
      prayers && prayers.filter((prayer) => prayer.memberId === member.id)
    if (query && query.length === 1) {
      prayer = query[0]
    } else {
      prayer = { content: "", memberId: member.id, date }
    }

    return <PrayerListItem prayer={prayer} member={member} key={member.id} />
  }

  return <CustomList items={members_} render={render} />
}
