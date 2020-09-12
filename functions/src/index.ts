import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

admin.initializeApp()

type TokensWithUID = { uid: string; token: string }[]

export const sendNotifications = functions.firestore
  .document("notices/{noticeId}")
  .onCreate(async (event) => {
    // Setup notification
    const notification = event.data().val()

    const payload = {
      notification: {
        title: notification.title,
        body: notification.content,
        icon: "https://london-gvc.web.app/android-chrome-512x512.png",
        click_action: `https://${functions.config().firebase.authDomain}`,
      },
    }

    // Clean invalid tokens
    const cleanInvalidTokens = (
      tokensWithKey: TokensWithUID,
      results: admin.messaging.MessagingDeviceResult[]
    ) => {
      const invalidTokens: Promise<FirebaseFirestore.WriteResult>[] = []

      results.forEach(async (result, i) => {
        if (!result.error) return

        console.error(
          "Failure sending notification to",
          tokensWithKey[i].token,
          result.error
        )

        switch (result.error.code) {
          case "messaging/invalid-registration-token":
          case "messaging/registration-token-not-registered":
            const { uid, token } = tokensWithKey[i]
            const documentSnapshot = await admin
              .firestore()
              .collection("notificationTokens")
              .doc(uid)
              .get()
            const data = documentSnapshot.data()

            const prevTokens =
              data && "tokens" in data
                ? (data["tokens"] as { [key: string]: string })
                : {}

            if (token in prevTokens) {
              const { [token]: omit, ...newTokens } = prevTokens

              console.log("Token deleted on cloud!")
              invalidTokens.push(
                admin
                  .firestore()
                  .collection("/notificationTokens")
                  .doc(uid)
                  .set({ uid, tokens: newTokens })
              )
            }
            break
          default:
            break
        }
      })

      return Promise.all(invalidTokens)
    }

    const notificationTokensSnapshot = await admin
      .firestore()
      .collection("/notificationTokens")
      .get()

    const tokensWithUID: TokensWithUID = []
    const tokens: string[] = []

    notificationTokensSnapshot.forEach((doc) => {
      Object.keys(doc.data().tokens).forEach((token) => {
        tokensWithUID.push({ uid: doc.id, token })
        tokens.push(token)
      })
    })

    const response = await admin.messaging().sendToDevice(tokens, payload)
    await cleanInvalidTokens(tokensWithUID, response.results)
  })
