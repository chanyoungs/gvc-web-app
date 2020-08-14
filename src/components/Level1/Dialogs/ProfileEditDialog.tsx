import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ImageIcon from "@material-ui/icons/Image"
import UndoIcon from "@material-ui/icons/Undo"
import VisibilityIcon from "@material-ui/icons/Visibility"
import { DatePicker } from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import React, { FC, Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"

import { editProfile } from "../../../store/actions/authActions"
import { IMemberDownload, IMemberUpload } from "../../../types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      width: "100%",
      // height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    accountCircleIcon: {
      marginBottom: theme.spacing(2),
    },
    buttonBaseAction: {
      padding: theme.spacing(2),
    },
    buttonBaseChildren: {
      width: "100%",
      display: "flex",
    },

    imageContainer: {
      minHeight: theme.spacing(16),
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    return: {
      padding: 0,
    },
    edit: {
      padding: 0,
    },
    text: {
      // color: theme.palette.common.black,
    },
    input: {
      display: "none",
    },
    image: {
      width: "100%",
    },
    overlay: {
      background: "rgba(0,0,0, 0.5)",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
)

export interface ProfileEditDialogProps {
  member: IMemberDownload
}

export const ProfileEditDialog: FC<ProfileEditDialogProps> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<boolean>(false)
  const [localImage, setLocalImage] = React.useState<{
    file: File | null
    url: string
  }>({
    file: null,
    url: "",
  })
  const [progress, setProgress] = React.useState<number>(0)
  const [updating, setUpdating] = React.useState<boolean>(false)
  const [member, setMember] = React.useState<IMemberUpload>({
    ...props.member,
    dob: props.member.dob.toDate(),
  })
  const [deleteImage, setDeleteImage] = React.useState<boolean>(false)
  useEffect(() => {
    setEdit(false)
    setLocalImage({
      file: null,
      url: "",
    })
    setProgress(0)
    setMember({
      ...props.member,
      dob: props.member.dob.toDate(),
    })
    setDeleteImage(false)
  }, [open, props.member])

  const classes = useStyles()
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = (member: IMemberUpload) => (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    dispatch(
      editProfile({
        member,
        image: localImage,
        deleteImage,
        setProgress,
        setUpdating,
        handleClose,
      })
    )
  }

  const handleClickEdit = () => {
    console.log("Clicked!")
    setEdit(!edit)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0]
    const reader = new FileReader()
    reader.onloadstart = (e) => {
      setUpdating(true)
    }
    reader.onloadend = (e) => {
      const imageUrl = typeof reader.result === "string" ? reader.result : ""
      setLocalImage({ ...localImage, file: imageFile, url: imageUrl })
      setUpdating(false)
    }
    const result = imageFile ? reader.readAsDataURL(imageFile) : ""
  }

  return (
    <Fragment>
      <ButtonBase
        onClick={handleClickOpen}
        className={classes.buttonBaseChildren}
      >
        {props.children}
      </ButtonBase>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          disableTypography
          id="form-dialog-title"
          className={classes.text}
        >
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
                Member Profile
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={handleClickEdit}
                className={classes.edit}
                aria-label="settings"
              >
                {edit ? <VisibilityIcon /> : <EditIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              {deleteImage ? (
                edit && (
                  <div className={classes.imageContainer}>
                    <AccountCircleIcon
                      fontSize="large"
                      className={classes.accountCircleIcon}
                    />
                    <Button
                      startIcon={<UndoIcon />}
                      onClick={() => setDeleteImage(false)}
                    >
                      UNDO DELETE
                    </Button>
                  </div>
                )
              ) : (
                <div className={classes.imageContainer}>
                  {localImage.url || member.photoUrl ? (
                    <img
                      src={localImage.url || member.photoUrl}
                      alt={member.name}
                      className={classes.image}
                    />
                  ) : (
                    !edit && <AccountCircleIcon fontSize="large" />
                  )}
                  {edit && (
                    <div className={classes.overlay}>
                      {updating ? (
                        <CircularProgress />
                      ) : (
                        <div className={classes.actions}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            onChange={handleImageChange}
                          />

                          <label htmlFor="icon-button-file">
                            <Button
                              startIcon={<ImageIcon />}
                              size="large"
                              component="div"
                            >
                              CHOOSE PHOTO
                            </Button>
                          </label>
                          {props.member.photoUrl && (
                            <Button
                              startIcon={<DeleteIcon />}
                              onClick={() => setDeleteImage(true)}
                              size="large"
                            >
                              DELETE PHOTO
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Grid>
            {/* {loading && (
                          <CircularProgress
                            variant="determinate"
                            value={progress}
                          />
                        )} */}
            <Grid item xs={12}>
              <TextField
                id="standard-name-input"
                label="Name"
                value={member.name}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => {
                  setMember({ ...member, name: event.target.value })
                }}
                fullWidth
                disabled={!edit}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-cell-input"
                label="Cell"
                value={member.cell}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => {
                  setMember({ ...member, cell: event.target.value })
                }}
                fullWidth
                disabled={!edit}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={member.dob}
                onChange={(date: MaterialUiPickersDate) => {
                  setMember({ ...member, dob: date })
                }}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
                disabled={!edit}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {edit && (
            <Button
              onClick={handleSave(member)}
              className={classes.text}
              disabled={updating}
            >
              SAVE
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
