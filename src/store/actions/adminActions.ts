import { ICells, IMemberDownload, IMemberUpload } from "src/types"

import { ThunkActionCustom } from "./types"

export const updateMemberCell =
  (
    member: IMemberDownload | IMemberUpload,
    newCellId: string,
    callback?: () => void
  ): ThunkActionCustom<void> =>
  async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const cellsRef = firestore.collection("cells").doc("cells")

    try {
      await firestore.runTransaction(async (transaction) => {
        const cellsSnapshot = await transaction.get(cellsRef)
        const cells: ICells | undefined = cellsSnapshot.data()

        if (cells) {
          // If current cell exists, remove member from previous cell
          if (member.cell in cells) {
            await transaction.update(cellsRef, {
              [`${member.cell}.members`]: firestore.FieldValue.arrayRemove(
                member.id
              ),
            })
          }

          // If member doesn't exist in the new cell already, add member to the new cell
          if (!cells[newCellId].members.includes(member.cell)) {
            // Add member to new cell
            await transaction.update(cellsRef, {
              [`${newCellId}.members`]: firestore.FieldValue.arrayUnion(
                member.id
              ),
            })
          }

          // Update member profile's cell
          await transaction.update(
            firestore.collection("members").doc(member.id),
            {
              cell: newCellId,
            }
          )
        }
      })
      console.log("Cell (re)allocation success!")
      callback && callback()
    } catch (error) {
      console.error("Cell (re)allocation fail!", error)
    }
  }

// try {
//   const cellsSnapshot = await cellsRef.get()
//   const cells: ICells | undefined = cellsSnapshot.data()

//   if (cells) {
//     if (member.cell in cells) {
//       // Remove member from previous cell
//       await cellsRef.update({
//         [`${member.cell}.members`]: firestore.FieldValue.arrayRemove(
//           member.id
//         ),
//       })
//     }

//     // Add member to new cell
//     await cellsRef.update({
//       [`${newCellId}.members`]: firestore.FieldValue.arrayUnion(member.id),
//     })

//     // Update member profile's cell
//     await firestore.collection("members").doc(member.id).update({
//       cell: newCellId,
//     })

//     console.log("Cell (re)allocation success!")
//     callback && callback()
//   }
// } catch (error) {
//   console.error("Cell (re)allocation fail!", error)
// }
// }
