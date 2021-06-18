import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { IBiblePageOpen, IBiblePageSetOpen, IBibleRef } from "src/components/Pages/BiblePage"
import { BibleState } from "src/store/reducers/bibleReducer"
import { AppState } from "src/store/reducers/rootReducer"
import { languageRef } from "src/utils/localisation"

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
    dialog: {},
    itemHorizontal: {
      flex: 1,
      // TODO: Find the proper way to style
      width: "100vw",
    },
    return: {
      padding: 0,
    },
  })
)

export interface BibleDialogProps {
  bibleRefKey: keyof IBibleRef
  bibleRef: IBibleRef
  setAndUploadBibleRef: (bibleRef: IBibleRef) => void
  open: IBiblePageOpen
  setOpen: IBiblePageSetOpen
}

export const BibleDialog: FC<BibleDialogProps> = (props) => {
  const { bibleRefKey, bibleRef, setAndUploadBibleRef, open, setOpen } = props
  const classes = useStyles()

  const bibleIndex = useSelector<AppState, BibleState["index"]>(
    (state) => state.bible.index
  )

  const handleClickOpen = () => {
    setOpen({ ...open, [bibleRefKey]: true })
  }

  const handleClose = () => {
    setOpen({ ...open, [bibleRefKey]: false })
  }

  const onClickItem =
    <K extends keyof IBibleRef>(value: IBibleRef[K]) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      let updatedBibleRef = {
        ...bibleRef,
        [bibleRefKey as K]: value,
      }

      let updatedOpen = {
        ...open,
        [bibleRefKey as K]: false,
      }

      if (bibleRefKey === "book") {
        updatedBibleRef = {
          ...updatedBibleRef,
          chapter: null,
        }
        updatedOpen = {
          ...updatedOpen,
          chapter: true,
        }
      }

      setAndUploadBibleRef(updatedBibleRef)
      setOpen(updatedOpen)
    }

  const translationFull = {
    niv: "NIV",
    nkrv: "개역개정",
    aeb: "쉬운성경",
  }

  const translate = () =>
    bibleRef.translation === "niv" ? "english" : "korean"

  const buttonContent = (bibleRefKey: keyof IBibleRef) => {
    switch (bibleRefKey) {
      case "translation":
        return translationFull[bibleRef.translation]
      case "book":
        return bibleRef.book !== null
          ? bibleIndex[translate()][bibleRef.book]
          : "Book"

      case "chapter":
        return bibleRef.chapter !== null ? bibleRef.chapter : "Chapter"
      default:
        return null
    }
  }

  const dialogContent = (bibleRefKey: keyof IBibleRef) => {
    switch (bibleRefKey) {
      case "translation":
        return (
          <div className={classes.containerVertical}>
            {(["niv", "nkrv", "aeb"] as IBibleRef["translation"][]).map(
              (t: IBibleRef["translation"]) => (
                <Button
                  key={t}
                  onClick={onClickItem(t)}
                  variant={bibleRef.translation === t ? "outlined" : "text"}
                >
                  {translationFull[t]}
                </Button>
              )
            )}
          </div>
        )

      case "book":
        return (
          <div className={classes.containerHorizontal}>
            {["old", "new"].map((testament) => (
              <div key={testament} className={classes.itemHorizontal}>
                <Typography variant="h6" align="center">
                  {testament === "old"
                    ? bibleRef.translation === "niv"
                      ? "Old Testament"
                      : "구약"
                    : bibleRef.translation === "niv"
                    ? "New Testament"
                    : "신약"}
                </Typography>
                <Divider />
                <div className={classes.containerVertical}>
                  {bibleIndex[
                    testament === "old" ? "indicesOld" : "indicesNew"
                  ].map((i) => (
                    <Button
                      key={i}
                      onClick={onClickItem(i)}
                      variant={bibleRef.book === i ? "outlined" : "text"}
                    >
                      {bibleIndex[translate()][i]}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case "chapter":
        const chaptersArray = () => {
          let out = []
          if (bibleRef.book !== null) {
            for (let i = 1; i <= bibleIndex.totalChapters[bibleRef.book]; i++) {
              out.push(i)
            }
          }
          return out
        }

        return (
          <Grid container justify="center" alignItems="center" spacing={1}>
            {chaptersArray().map((i) => (
              <Grid item key={i}>
                <Button
                  onClick={onClickItem(i)}
                  variant={bibleRef[bibleRefKey] === i ? "outlined" : "text"}
                >
                  {i}
                </Button>
              </Grid>
            ))}
          </Grid>
        )

      default:
        return <p>Loading {bibleRefKey}...</p>
    }
  }

  return (
    <Fragment>
      <Button size="small" onClick={handleClickOpen} color="inherit">
        {buttonContent(bibleRefKey)}
      </Button>

      <Dialog
        className={classes.dialog}
        open={open[bibleRefKey]}
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
                {languageRef.value === "korean"
                  ? `${
                      bibleRefKey === "translation"
                        ? "번역"
                        : bibleRefKey === "book"
                        ? "서적"
                        : "장"
                    }을 선택하세요`
                  : `Choose a ${bibleRefKey}`}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>{dialogContent(bibleRefKey)}</DialogContent>
      </Dialog>
    </Fragment>
  )
}
