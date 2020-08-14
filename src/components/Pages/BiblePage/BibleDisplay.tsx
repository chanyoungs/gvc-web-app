import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { BibleState } from "src/store/reducers/bibleReducer"
import { AppState } from "src/store/reducers/rootReducer"
import { IBibles } from "src/types"

import { IBibleRef } from "."

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlight: { fontWeight: 700, background: "#000000" },
    listItem: { display: "flex", alignItems: "flex-start" },
    verse: { alignSelf: "flex-start", flex: 1 },
    text: { flex: 10 },
  })
)

export interface BibleDisplayProps {
  translation: IBibleRef["translation"]
  book: number
  chapter: number
}

export const BibleDisplay: FC<BibleDisplayProps> = ({
  translation,
  chapter,
  book,
}) => {
  const classes = useStyles()

  const bibleIndex = useSelector<AppState, BibleState["index"]>(
    (state) => state.bible.index
  )
  const search = useSelector<AppState, string>((state) => state.appBar.search)

  const docId = `${String(
    bibleIndex.cumulativeChapters[book] + chapter
  ).padStart(4, "0")}_${translation}`

  useFirestoreConnect([{ collection: "bibles", doc: docId }])

  const reading = useSelector<AppState, IBibles>(
    (state) => state.firestore.data.bibles && state.firestore.data.bibles[docId]
  )

  const highlight = (text: string, search: string) => {
    const matches = match(text.toLocaleLowerCase(), search.toLocaleLowerCase())
    const parts = parse(text, matches)
    return parts.map((part, index) =>
      part.highlight ? (
        <span key={index} className={classes.highlight}>
          {part.text}
        </span>
      ) : (
        <span key={index}>
          {/* <span key={index} style={{ fontWeight: 500 }}> */}
          {part.text}
        </span>
      )
    )
  }

  return (
    <List>
      {reading &&
        [...reading.verses]
          .filter((v) =>
            v.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((v) => (
            <ListItem className={classes.listItem} key={v.indexVerse}>
              <Typography className={classes.verse} align="left">
                {v.verse}
              </Typography>
              <Typography className={classes.text} align="justify">
                {highlight(v.text, search)}
              </Typography>
            </ListItem>
          ))}
    </List>
    // <Fragment>
    //   {reading &&
    //     [...reading.verses]
    //       .filter(v =>
    //         v.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    //       )
    //       .map(v => (
    //         <Grid key={v.indexVerse} container spacing={1}>
    //           <Grid item xs={1}>
    //             {v.verse}
    //           </Grid>
    //           <Grid item xs>
    //             {highlight(v.text, search)}
    //             {/* {v.text} */}
    //           </Grid>
    //         </Grid>
    //       ))}
    // </Fragment>
  )
}
