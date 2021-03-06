import { VerboseFormattingArg } from "@fullcalendar/core"
import { DateClickArg } from "@fullcalendar/interaction"
import FullCalendar, { EventClickArg, EventInput } from "@fullcalendar/react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import moment from "moment"
import React, { FC, Fragment, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload } from "src/types"

import { dayGridPlugin, interactionPlugin, listPlugin, rrulePlugin, timeGridPlugin } from "./pluginModules"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

type Mode = "List" | "Calendar"
type DWMY = "Day" | "Week" | "Month" | "Year"

export const CustomCalendar: FC = () => {
  const classes = useStyles()
  const [events, setEvents] = useState<EventInput[]>([])
  const [mode, setMode] = useState<Mode>("Calendar")
  const [dwmy, setDMWY] = useState<DWMY>("Month")

  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  useFirestoreConnect([
    {
      collection: "members",
      orderBy: ["name", "asc"],
      where: ["cell", "==", profile.cell ? profile.cell : ""],
    },
  ])

  const members = useSelector<AppState, IMemberDownload[]>(
    (state) => state.firestore.ordered.members
  )

  const dispatch = useDispatch()

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

  const birthdays: EventInput[] = members
    ? members.map((member) => ({
        allDay: true,
        title: `🎁 ${member.name}`,
        rrule: {
          freq: "yearly",
          dtstart: member.dob.toDate(),
        },
      }))
    : []

  console.log("CustomCalendar:FC -> birthdays", birthdays)

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
          text: "List",
          click: changeMode("List"),
        },
        calendarButton: {
          text: "Calendar",
          click: changeMode("Calendar"),
        },
        dayButton: {
          text: "Day",
          click: changeDWMY("Day"),
        },
        weekButton: {
          text: "Week",
          click: changeDWMY("Week"),
        },
        monthButton: {
          text: "Month",
          click: changeDWMY("Month"),
        },
        yearButton: {
          text: "Year",
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
          buttonText: "Today",
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
