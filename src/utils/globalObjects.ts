import moment from "moment"
import { IReport } from "src/types"

import { db } from "./../firebase"

export const globalObjects = () => {
  // @ts-ignore
  window.createDummyMembers = () => {
    const startDate = new Date("1980/01/01")
    const endDate = new Date("2010/12/31")

    for (let cell = 1; cell <= 5; cell++) {
      for (let member = 0; member <= 3; member++) {
        db.collection("members")
          .doc("c" + cell + "m" + member)
          .set({
            name:
              "Cell" + cell + (member === 0 ? "-Leader" : "-Member" + member),
            cell: "" + cell,
            dob: new Date(
              startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
            ), // A random date between 1980/01/01 and 2010/12/31
            positions: member === 0 ? ["leader"] : [],
          })
          .then(() => console.log("Complete!"))
      }
    }
  }

  // @ts-ignore
  window.createReports = () => {
    for (let cell = 1; cell <= 5; cell++) {
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
