import AppBar from "@material-ui/core/AppBar"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { BibleDisplay } from "src/components/Pages/BiblePage/BibleDisplay"
import { uploadBibleRef } from "src/store/actions/bibleActions"
import { BibleState } from "src/store/reducers/bibleReducer"
import { AppState } from "src/store/reducers/rootReducer"
import { localise } from "src/utils/localisation"

import { BibleDialog } from "../../Level1/Dialogs/BibleDialog"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minHeight: "100vh" },
    buttonGroup: {
      height: "100%",
      padding: 0,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    footer: {
      bottom: 0,
    },
    divider: {
      color: theme.palette.common.white,
      background: theme.palette.common.white,
    },
  })
)

export interface BiblePageProps {}
export interface IBibleRef {
  translation: "niv" | "nkrv" | "aeb"
  book: number | null
  chapter: number | null
}

export type IBiblePageOpen = {
  [key in keyof IBibleRef]: boolean
}

export type IBiblePageSetOpen = (open: IBiblePageOpen) => void

export const BiblePage: FC<BiblePageProps> = (props) => {
  const classes = useStyles()

  const [open, setOpen] = useState<IBiblePageOpen>({
    translation: false,
    book: false,
    chapter: false,
  })

  const bibleRef = useSelector<AppState, BibleState["ref"]>(
    (state) => state.bible.ref
  )

  const dispatch = useDispatch()

  const bibleIndex = useSelector<AppState, BibleState["index"]>(
    (state) => state.bible.index
  )
  const uid = useSelector<AppState, string>((state) => state.firebase.auth.uid)

  useFirestoreConnect([{ collection: "bibleRefs", doc: uid }])
  const remoteBibleRef = useSelector<AppState, BibleState["ref"]>(
    (state) =>
      state.firestore.data.bibleRefs && state.firestore.data.bibleRefs[uid]
  )

  useEffect(() => {
    if (uid)
      dispatch({
        type: "SET_BIBLE_REFERENCE",
        payload: {
          translation: remoteBibleRef?.translation
            ? remoteBibleRef.translation
            : "niv",
          book:
            remoteBibleRef?.book !== (null || undefined)
              ? remoteBibleRef.book
              : null,
          chapter:
            remoteBibleRef?.chapter !== (null || undefined)
              ? remoteBibleRef.chapter
              : null,
        },
      })
  }, [uid, remoteBibleRef, dispatch])

  const setAndUploadBibleRef = (br: IBibleRef) => {
    if (uid) dispatch(uploadBibleRef(br, uid))
    dispatch({ type: "SET_BIBLE_REFERENCE", payload: br })
  }

  const nextChapter = () => {
    if (bibleRef.book !== null && bibleRef.chapter !== null) {
      let newBook: number
      let newChapter: number

      if (bibleRef.chapter === bibleIndex.totalChapters[bibleRef.book]) {
        newBook =
          bibleRef.book === bibleIndex.totalChapters.length - 1
            ? 0
            : bibleRef.book + 1
        newChapter = 1
      } else {
        newBook = bibleRef.book
        newChapter = bibleRef.chapter + 1
      }

      setAndUploadBibleRef({
        ...bibleRef,
        book: newBook,
        chapter: newChapter,
      })
    }
  }

  const previousChapter = () => {
    if (bibleRef.book !== null && bibleRef.chapter !== null) {
      let newBook: number
      let newChapter: number

      if (bibleRef.chapter === 1) {
        newBook =
          bibleRef.book === 0
            ? bibleIndex.indices[bibleIndex.indices.length - 1]
            : bibleRef.book - 1
        newChapter = bibleIndex.totalChapters[newBook]
      } else {
        newChapter = bibleRef.chapter - 1
        newBook = bibleRef.book
      }

      setAndUploadBibleRef({
        ...bibleRef,
        book: newBook,
        chapter: newChapter,
      })
    }
  }

  return (
    <Fragment>
      <AppBarMain
        title={localise({ english: "Bible", korean: "성경" })}
        searchBar
      />
      <ContainerMain>
        <div className={classes.root}>
          {bibleRef.book !== null && bibleRef.chapter !== null && (
            <BibleDisplay
              translation={bibleRef.translation}
              book={bibleRef.book}
              chapter={bibleRef.chapter}
            />
          )}
        </div>
      </ContainerMain>
      <Slide appear={false} direction="up" in={true}>
        <AppBar position="sticky" className={classes.footer}>
          <Grid container justify="space-between">
            <Grid item>
              <IconButton onClick={previousChapter} color="inherit">
                <NavigateBeforeIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <ButtonGroup fullWidth className={classes.buttonGroup}>
                {(
                  ["translation", "book", "chapter"] as (keyof IBibleRef)[]
                ).map(
                  (bibleRefKey) =>
                    (bibleRefKey !== "chapter" || bibleRef.book !== null) && (
                      <BibleDialog
                        key={bibleRefKey}
                        bibleRefKey={bibleRefKey}
                        bibleRef={bibleRef}
                        setAndUploadBibleRef={setAndUploadBibleRef}
                        open={open}
                        setOpen={setOpen}
                      />
                    )
                )}
              </ButtonGroup>
            </Grid>
            <Grid item>
              <IconButton onClick={nextChapter} color="inherit">
                <NavigateNextIcon />
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>
      </Slide>
    </Fragment>
  )
}
