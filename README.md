## TODO LIST

- [ ] Currently, there are multiple instances of profile editdialogs. Fix if unnecessary
- [] Update signUp action with respect to the new fields
- [x] 19/02/21 CY - ~~Issue: In Signup page, when gender is chosen and you leave the page and come back, it is unchecked~~ &larr; Dirty fix by getting value from another useField and applying it to the original useField
- [] Issue: In Signup page, email availability is not checked immediately
- [x] 15/02/21 CY - Implemented tabs in reports page
- [x] 27/09/20 CY - Implemented new AuthPage
- [x] PWA features
  - [x] 13/09/20 CY - Implemented Push notification for Android
  - [x] 08/09/20 CY - Implemented Offline support
  - [x] 06/09/20 CY - Implemented Share text feautre
  - [x] 05/09/20 CY - Implemented Live Update feature
- [x] 05/09/20 CY - Updated Icons
- [x] 03/09/20 CY - Added build time in drawer
- [x] 03/09/20 CY - Made attendance link with firestore
- [x] 03/09/20 CY - Complete the relationships between change of date from PrayersPage and state and props of PrayerListItem
- [x] 02/09/20 CY - Implemented responsive sidebar
- [x] 29/08/20 CY - FAB now zooms in and out
- [x] 14/08/20 CY - Implemented Attendance mode in report page
- [x] 04/08/20 CY - Fixed positioning of FAB
- [ ] Styling
  - [ ] Padding and spacing
  - [x] 02/09/20 CY - Removed unnecessary paddings on reports listitem
  - [x] 15/08/20 CY - ~~Issue: There seems to be some sizing problem with Textfield in list in reports page. Transitioning from prayer<->attendance causes some unwanted movement throughout the whole page~~ &larr; Solved by adding a "paddingBottom: 0" to TextField InputProps. UPDATE: Actually, it turns out the problem is using textfield and buttongroup at the same time. When using ToggleButtonGroup, the problem disappears
  - [x] 04/08/20 CY - AuthPage new style
  - [x] 01/07/20 CY - Changed Appbar and side drawer to have primary main colour
  - [x] 27/06/20 CY - Removed 'OK' & 'Cancel' on datepicker using variant="inline" and moved datepicker icon to the start
  - [x] 27/06/20 CY - Stylised Theme editor page
  - [x] 24/06/20 CY - Finished styling prayer list item
  - [x] 24/06/20 CY - Finished styling app bar and drawer
- [ ] Implement Calendar page
  - [x] 17/07/20 CY - Basic implementation of calendar page
- [x] 14/07/20 CY - Make prayers save on firestore
- [x] 14/07/20 CY - Connect Date and Prayer query
  - [x] 14/07/20 CY - Convert prayers objects to report objects
  - [x] 14/07/20 CY - Implemented timer and onBlur based autosave
- [x] 14/07/20 CY - Add a FAB
- [x] 14/07/20 CY - Add a save snackbar
- [x] 11/07/20 CY - Install new typographies: Added font installer in theme editor page
- [x] 01/07/20 CY - Finished adding JSON input feature on theme page
- [x] 27/06/20 CY - Added Theme editor page
- [x] 27/06/20 CY - Added Storybook 'npm run storybook' - See [Link](https://storybook.js.org/)
- [x] 26/06/20 CY - Typed CustomList & ContainerMain using generics
- [x] 26/06/20 CY - Implement Date & Datepicker dialog
- [x] 24/06/20 CY - Changed the notice alert icon
- [x] 24/06/20 CY - Implemented new design prayer component
- [x] 24/06/20 CY - Refactored List components into Presentational & Container
- [x] 12/06/20 JH - Added delete, edit on Notice
- [x] Made prayers query a redux reducer
  - [ ] Issue: Not so clean implementation. Probably should find another way
- [x] Created Dates page and have it be the landing prayers page
- [x] Make week view list all past weeks this year in prayers page
- [x] Make the current page highlight on the side drawer
- [x] Make local BibleRef a redux state
- [x] Implement restricting view to my cell only
- [x] Implement Bible page
  - [x] Implemented basic functionality
  - [x] Implemented search with highlight match
  - [x] Updated Bible names
  - [x] Firestore persistence
  - [x] Styling
  - [x] Refactor repeated Bible dialogs
- [x] Implement uploading thumbnail size profile photo
- [x] Implement Absolute importing
- [x] 13/03/20 - Add notices page
- [x] 12/03/20 - Implement delete profile photo
  - [x] Implemented basic delete function
  - [x] ~~Issue: Dialog does not update its states/render after close e.g. After deleting/uploading photo, previous state of image is left behind. After closing the dialog once more manually then opening fixes the issue~~ &larr; Solved with useEffect hook
  - [x] Replace position of "Cancel delete" to the "Choose Image"
- [x] 12/03/20 - Typed up date objects depending on download(firestore Timestamp) or upload(Date)
- [x] 11/03/20 - Implement Photo upload
- [x] 11/03/20 - Implement displaying profile photo
- [x] Implement Prayers page
- [ ] Implement formik with edit profile card
- [ ] Implement "Go back to previous page" after sign in for public pages too
- [x] Included "Playground" item to the sidebar
- [x] Implemented conditional "My Account/Sign In" item in the sidebar
- [x] Finish styling the edit profile card
- [x] Implement edit profile card
- [x] Implemented sign out button and made appbar take title prop
- [x] Implemented search function to filter the members list
- [x] Make Account, Members, Prayers, Calendar page at the side bar
- [x] Implement rerouting for signin/up &larr; (See Issue 1.)
  - Update: Solved Issue 1.
- [x] Implement progress animation
- [x] Implement reset password
- [x] Make "name" prop in form fields in AuthPage one of key of IAuthForm
- [x] Make the yup input object, type safe with IAuthForm
- [x] Implement Signin/up error message
- [x] Implement Remember me
- [x] Use Formik for forms ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Implement custom components to be used with Formik ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Implement validation using Yup ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Join Auth and Firestore profile ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))

## Issues

Issue 2. How to reproduce error: "/public" &rarr; "/" &rarr; "public". This creates "TypeError: Cannot read property 'name' of undefined" error. The problem is the list "membersDic" in this setting is not fully loaded which causes the error. We need to somehow find a way to make sure to render only after all the data is ready.

- UPDATE: Partially solved by filtering out the prayer list which only has memberId in the membersDic. Still, the problem lies why does the membersDic load slowly when we return to the public page?

~~Issue 1. Rerouting after signin currently has a problem. After success, in the promise, the redux state for auth is not yet updated and therefore made a temporary fix by waiting 1 millisecond. See the 'signIn' function in 'authActions.ts'~~ &larr; Solved by checking for authstate and redirecting by conditionally returning redirect on signin page

- UPDATE: Properly implemented rerouting all in PrivateRouter component

## Questions

- [x] How to make conditional type? See src&rarr;utils&rarr;example.ts
  - See notes.tsx on section "Conditional type based on value"
- [ ] How should we structure our database? In particular, if we only have members details have one source of truth on "members" collection, then users like 목사님 may end up doing 300+ reads every session. This could be dealt with: caching/having multiple source of truth synchronised by firefunctions/summary document
- [ ] There is a lag between firebase auth update and redux-firebase state
- [ ] How should we sign people up?

## Notes

- 'firestoreReducer' from "redux-firestore" has "any" ReturnType and is able to hook up typescript definitions when using "useSelect" with "state.firestore"

- @date-io/date-fns 2.x(Dependency for @material-ui/pickers) seems to be broken and so we use 1.3.13 instead

- Firestore automatically converts Date type into Timestamp type which causes some confusion. Timestamp must first be converted to Date type to use the usual Date methods.

- ~~Seems like IconButton component should but doesn't expect a 'component' prop which causes Typescript error found in ProfileEditDialog.
  There has already been a similar issue with material-ui [here](https://github.com/mui-org/material-ui/issues/19068)~~ &larr; Seems fixed now

- ~~react-swipeable-views currently has known bug with the latest version so we use version 0.13.3 which currently works~~ &larr; Fixed from 0.13.9

## Tips

- You can combine two class styles by doing className={\`${classes.style1} ${classes.style2}\`}
