import { ICell, ICells, IMemberDownload, IMemberUpload } from "src/types"
import { v4 as uuid } from "uuid"

import { ThunkActionCustom } from "./types"

export interface UpdateMemberCellProps {
  memberId: string
  newCellId: string
  callback?: () => void
}

export const updateMemberCell =
  ({
    memberId,
    newCellId,
    callback,
  }: UpdateMemberCellProps): ThunkActionCustom<void> =>
  async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()

    try {
      await firestore
        .collection("members")
        .doc(memberId)
        .update({ cell: newCellId, cellRequest: newCellId })
      console.log("Cell (re)allocation success!")
      callback && callback()
    } catch (error) {
      console.error("Cell (re)allocation fail!", error)
    }
  }

export interface AddNewCellProps {
  name: string
  callback?: () => void
}

export const addNewCell =
  ({ name, callback }: AddNewCellProps): ThunkActionCustom<void> =>
  async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const newCellId = uuid()
    const newCell: ICell = {
      id: newCellId,
      leaders: [],
      name,
    }
    try {
      await firestore
        .collection("cells")
        .doc("cells")
        .update({
          [newCellId]: newCell,
        })
      console.log(`Cell ${name} added successfully!`)
      callback && callback()
    } catch (error) {
      console.error("Cell addition fail!", error)
    }
  }

// export const updateMemberCell =
// ({
//   memberId,
//   currentCellId,
//   newCellId,
//   callback,
// }: UpdateMemberCellProps): ThunkActionCustom<void> =>
// async (dispatch, getState, { getFirestore, getFirebase }) => {
//   const firestore = getFirestore()
//   const cellsRef = firestore.collection("cells").doc("cells")

//   try {
//     await firestore.runTransaction(async (transaction) => {
//       const cellsSnapshot = await transaction.get(cellsRef)
//       const cells: ICells | undefined = cellsSnapshot.data()

//       if (cells) {
//         // If current cell exists, remove member from previous cell
//         if (currentCellId in cells) {
//           transaction.update(cellsRef, {
//             [`${currentCellId}.members`]:
//               firestore.FieldValue.arrayRemove(memberId),
//           })
//         }

//         // If member doesn't exist in the new cell already, add member to the new cell
//         if (!cells[newCellId].members.includes(currentCellId)) {
//           // Add member to new cell
//           transaction.update(cellsRef, {
//             [`${newCellId}.members`]:
//               firestore.FieldValue.arrayUnion(memberId),
//           })
//         }

//         // Update member profile's cell
//         transaction.update(firestore.collection("members").doc(memberId), {
//           cell: newCellId,
//         })
//       }
//     })
//     console.log("Cell (re)allocation success!")
//     callback && callback()
//   } catch (error) {
//     console.error("Cell (re)allocation fail!", error)
//   }
// }
