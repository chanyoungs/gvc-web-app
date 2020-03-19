import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { BibleIndexState } from "src/store/reducers/bibleIndexReducer"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerVertical: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    containerHorizontal: {
      display: "flex",
    },
    itemHorizontal: {
      flex: 1,
    },
    return: {
      padding: 0,
    },
  })
)

export type Translation = "niv" | "kor" | "kor_easy"

export interface IPBibleTranslationDialog {
  translation: Translation
  setTranslation: (translation: Translation) => void
  openTranslation: boolean
  setOpenTranslation: (open: boolean) => void
}

export const BibleTranslationDialog: FC<IPBibleTranslationDialog> = props => {
  const {
    translation,
    setTranslation,
    openTranslation,
    setOpenTranslation,
  } = props
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpenTranslation(true)
  }

  const handleClose = () => {
    setOpenTranslation(false)
  }

  const onClickItem = (translation: Translation) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTranslation(translation)
    setOpenTranslation(false)
  }

  const display = {
    niv: "NIV",
    kor: "개역한글",
    kor_easy: "쉬운성경",
  }

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
      >{`Translation: ${display[translation]}`}</Button>
      <Dialog
        open={openTranslation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item>
              <IconButton
                onClick={handleClose}
                className={classes.return}
                aria-label="return"
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" align="center">
                Choose a Translation
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div className={classes.containerVertical}>
            {(["niv", "kor", "kor_easy"] as Translation[]).map(
              (t: Translation) =>
                translation === t ? (
                  <Button
                    onClick={onClickItem(t)}
                    variant="outlined"
                    color="primary"
                  >
                    {display[t]}
                  </Button>
                ) : (
                  <Button onClick={onClickItem(t)}>{display[t]}</Button>
                )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
