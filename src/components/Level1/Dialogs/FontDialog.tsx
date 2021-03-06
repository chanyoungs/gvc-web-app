import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import React, { FC, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { CustomList } from "src/components/Level2/Lists/CustomList"
import { deleteFont, uploadFont } from "src/store/actions/fontActions"
import { AppState } from "src/store/reducers/rootReducer"

export type Font = { name: string; font: string }

export const FontDialog: FC = () => {
  const [open, setOpen] = React.useState(false)
  const [fontURL, setFontURL] = React.useState<string>("")

  useFirestoreConnect([{ collection: "fonts" }])
  const fonts = useSelector<AppState, Font[]>(
    (state) => state.firestore.ordered.fonts
  )

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const extractFontFromURL = () => {
    const regex = /family=(.*)(:.*)&display/
    const groups = fontURL.match(regex)
    if (!groups || groups.length < 3) {
      return null
    } else {
      const name = groups[1].replace(/\+/g, " ")
      const font = groups[1] + groups[2]
      return { name, font }
    }
  }

  const render = (font: Font) => (
    <ListItem key={font.name}>
      <ListItemText primary={font.name} secondary={font.font} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={() => {
            dispatch(deleteFont(font.name))
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )

  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ADD NEW GOOGLE FONT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Installed font family</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Copy and Paste Google Font URL from "}
            <Link
              href="https://fonts.google.com/"
              onClick={(event: React.SyntheticEvent) => event.preventDefault()}
            >
              HERE
            </Link>
          </DialogContentText>
          <CustomList items={fonts} render={render} />

          <Grid container alignItems="center">
            {extractFontFromURL() && (
              <Fragment>
                <Grid item>
                  <Typography>Preview</Typography>
                </Grid>
                <Grid item xs>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={extractFontFromURL()?.name}
                        secondary={extractFontFromURL()?.font}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Fragment>
            )}
            <Grid item xs={10}>
              <TextField
                autoFocus
                value={fontURL}
                margin="dense"
                label="Paste URL here"
                error={fontURL !== "" && extractFontFromURL() === null}
                helperText={
                  fontURL !== "" &&
                  extractFontFromURL() === null &&
                  "Invalid Google Font URL!"
                }
                multiline
                rowsMax={4}
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFontURL(event.target.value)
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  const font = extractFontFromURL()
                  font && dispatch(uploadFont(font))
                  setFontURL("")
                }}
                color="primary"
                disabled={fontURL === "" || extractFontFromURL() === null}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
