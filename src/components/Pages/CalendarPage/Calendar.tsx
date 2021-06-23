import { VerboseFormattingArg } from "@fullcalendar/core"
import { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar, { EventClickArg, EventInput } from "@fullcalendar/react"
import moment from "moment"
import React, { FC, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getName } from "src/components/Level2/Lists/listUtils"
import { AppState } from "src/store/reducers/rootReducer"
import { getCellMembersWithIds } from "src/store/selectors/members"
import { IMembersWithIdCollection } from "src/types"
import { localise } from "src/utils/localisation"
import { memberWithIdToDate } from "src/utils/membersConversion"

import { dayGridPlugin, interactionPlugin, listPlugin, rrulePlugin, timeGridPlugin } from "./pluginModules"

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
// const useStyles = makeStyles((theme: Theme) => createStyles({}))

type Mode = "List" | "Calendar"
type DWMY = "Day" | "Week" | "Month" | "Year"

export const CustomCalendar: FC = () => {
  // const classes = useStyles()
  const [events, setEvents] = useState<EventInput[]>([])
  const [mode, setMode] = useState<Mode>("Calendar")
  const [dwmy, setDMWY] = useState<DWMY>("Month")

  const membersWithId = useSelector<AppState, IMembersWithIdCollection>(
    getCellMembersWithIds
  )

  const membersArr = Object.values(membersWithId)

  const calendarRef = useRef<FullCalendar>(null)

  const changeDWMY = (dwmy_: DWMY) => {
    return () => {
      setDMWY(dwmy_)
      changeView(dwmy_, mode)
    }
  }

  const changeMode = (mode_: Mode) => {
    return () => {
      setMode(mode_)
      changeView(dwmy, mode_)
    }
  }

  const changeView = (dwmy_: DWMY, mode_: Mode) => {
    let view: string
    if (mode_ === "List") view = "list" + dwmy_
    else {
      switch (dwmy_) {
        case "Day":
          view = "timeGridDay"
          break
        case "Week":
          view = "timeGridWeek"
          break
        case "Month":
          view = "dayGridMonth"
          break
        case "Year":
          view = "listYear"
          break
        default:
          view = "dayGridMonth"
          break
      }
    }
    calendarRef.current?.getApi().changeView(view)
  }

  const birthdays: EventInput[] = membersArr
    ? membersArr.map((m) => {
        const member = memberWithIdToDate(m)

        return {
          allDay: true,
          title: `🎁 ${getName(member)}`,
          rrule: {
            freq: "yearly",
            dtstart: member.dob,
          },
        }
      })
    : []

  return (
    <FullCalendar
      editable
      selectable
      ref={calendarRef}
      plugins={[
        dayGridPlugin,
        interactionPlugin,
        listPlugin,
        rrulePlugin,
        timeGridPlugin,
      ]}
      initialView="dayGridMonth"
      customButtons={{
        listButton: {
          text: localise({ english: "List", korean: "일정" }),
          click: changeMode("List"),
        },
        calendarButton: {
          text: localise({ english: "Calendar", korean: "달력" }),
          click: changeMode("Calendar"),
        },
        dayButton: {
          text: localise({ english: "Day", korean: "일" }),
          click: changeDWMY("Day"),
        },
        weekButton: {
          text: localise({ english: "Week", korean: "주" }),
          click: changeDWMY("Week"),
        },
        monthButton: {
          text: localise({ english: "Month", korean: "월" }),
          click: changeDWMY("Month"),
        },
        yearButton: {
          text: localise({ english: "Year", korean: "년" }),
          click: changeDWMY("Year"),
        },
      }}
      views={{
        timeGridDay: {},
        timeGridWeek: {},
        dayGridMonth: {},
        listDay: {},
        listWeek: {},
        listMonth: {},
        listYear: {},
        today: {
          buttonText: localise({ english: "Today", korean: "오늘" }),
        },
      }}
      headerToolbar={{
        left: "calendarButton,listButton",
        center: "title",
        right: "today prev,next",
      }}
      footerToolbar={{
        left: "dayButton,weekButton,monthButton,yearButton",
      }}
      listDayFormat={(arg: VerboseFormattingArg) =>
        moment(arg.date).format("ddd Do MMM YYYY")
      }
      listDaySideFormat={(arg: VerboseFormattingArg) =>
        moment(arg.date).fromNow()
      }
      events={[
        ...birthdays,
        ...events,
        {
          title: "Today",
          date: new Date(),
          backgroundColor: "green",
          borderColor: "green",
        },
      ]}
      dateClick={(arg: DateClickArg) => {
        console.log({ arg })
        setEvents((prevEvents) => [
          ...prevEvents,
          { title: "Event", date: arg.dateStr },
        ])
      }}
      eventClick={(arg: EventClickArg) => {
        console.log({ arg })
      }}
      eventDidMount={(info) => {
        if (info.event.start) {
          if (info.event.start < new Date()) {
            // Change background color of row
            info.el.style.backgroundColor = "#A9A9A9"
            info.el.style.webkitTextStrokeColor = "white"

            // Change color of dot marker
            // var dotEl = info.el.getElementsByClassName<HTMLElement>("fc-event-dot")[0]
            // let dotEl = info.el.querySelector<HTMLElement>(".fc-event-dot")
            // if (dotEl) {
            //   dotEl.style.backgroundColor = "white"
            // }
          }
        }
      }}
    />
  )
}
