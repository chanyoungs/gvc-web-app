import moment from "moment"
import { ICells, IReport } from "src/types"

import { db } from "./../firebase"


export const globalObjects = () => {
  // @ts-ignore
  window.createDummyMembers = (cells = 5) => {
    const startDate = new Date("1980/01/01")
    const endDate = new Date("2010/12/31")

    for (let cell = 1; cell <= cells; cell++) {
      for (let member = 1; member <= 3; member++) {
        db.collection("members")
          .doc("c" + cell + "m" + member)
          .set({
            name: `Cell${cell}-Member${member}`,
            cell: `${cell}`,
            dob: new Date(
              startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
            ), // A random date between 1980/01/01 and 2010/12/31
            positions: [],
          })
          .then(() => console.log("Complete!"))
      }
    }
  }

  // @ts-ignore
  window.createReports = (cells = 5) => {
    for (let cell = 1; cell <= cells; cell++) {
      for (let member = 0; member <= 3; member++) {
        for (let day = 0; day <= 2; day++) {
          let date = moment()
            .day(0)
            .subtract(7 * day, "days")
          let report: IReport = {
            memberId: "c" + cell + "m" + member,
            cell: "" + cell,
            date: date.format("YYYY.MM.DD"),
            prayer: `Prayer of ${
              "Cell" + cell + (member === 0 ? "-Leader" : "-Member" + member)
            } created at ${date.format("Do MMM YYYY")}`,
            attendance: {
              service: Math.random() > 0.5,
              cell: Math.random() > 0.5,
              info:
                Math.random() > 0.5
                  ? `Info of ${
                      "Cell" +
                      cell +
                      (member === 0 ? "-Leader" : "-Member" + member)
                    } created at ${date.format("Do MMM YYYY")}`
                  : "",
            },
          }
          db.collection("reports")
            .doc(`${report.date}-${report.memberId}`)
            .set(report)
            .then(() => console.log("Complete!"))
        }
      }
    }
  }

  // @ts-ignore
  window.createCells = (cells = 5) => {
    const cellsDocument: ICells = {}
    for (let cell = 1; cell <= cells; cell++) {
      cellsDocument[cell] = {
        id: "" + cell,
        leaders: [`c${cell}m0`],
        name: "" + cell,
      }
    }
    db.collection("cells")
      .doc("cells")
      .set(cellsDocument)
      .then(() => console.log("Complete!"))
  }

  // @ts-ignore
  window.renameNames = async () => {
    const membersSnapshot = await db.collection("members").get()

    membersSnapshot.forEach((memberSnapshot) => {
      const memberId = memberSnapshot.id
      const memberDataRaw = memberSnapshot.data()
      if ("name" in memberDataRaw) {
        const { name, ...memberUpdate } = memberDataRaw

        const korean =
          name[0].match(
            /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g
          ) !== null

        const nameKor = korean ? name : ""
        const nameEng = korean ? "English Name" : name

        db.collection("members")
          .doc(memberId)
          .set({ ...memberUpdate, nameKor, nameEng })
      }
    })
  }

  // @ts-ignore
  window.addCellRequests = async () => {
    const membersSnapshot = await db.collection("members").get()

    membersSnapshot.forEach((memberSnapshot) => {
      const memberId = memberSnapshot.id
      const memberDataRaw = memberSnapshot.data()
      db.collection("members")
        .doc(memberId)
        .update({ cellRequest: memberDataRaw.cell })
    })
  }

  // @ts-ignore
  window.addSettings = async () => {
    const membersSnapshot = await db.collection("members").get()
    membersSnapshot.forEach((memberSnapshot) => {
      db.collection("members")
        .doc(memberSnapshot.id)
        .update({ settings: { language: "english" } })
    })
  }

  // // @ts-ignore
  // window.uploadBibles = () => {
  //   const bibles = require("./bibles.json")
  // console.log({ bibles })
  //   for (const bibleKey in bibles) {
  //     for (const chapterKey in bibles[bibleKey]) {
  //       db.collection("bibles")
  //         .doc(`${chapterKey}_${bibleKey}`)
  //         .set(bibles[bibleKey][chapterKey])
  //         .then(value => {
  //           console.log(chapterKey, "out of 1189")
  //         })
  //     }
  //   }
  // }

  // Add more objects below
}
