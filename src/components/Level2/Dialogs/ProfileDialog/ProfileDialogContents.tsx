import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import GroupIcon from "@material-ui/icons/Group"
import ImageIcon from "@material-ui/icons/Image"
import UndoIcon from "@material-ui/icons/Undo"
import VisibilityIcon from "@material-ui/icons/Visibility"
import { Form, Formik, FormikHelpers } from "formik"
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingBackdrop } from "src/components/Level1/Backdrops/LoadingBackdrop"
import { initialValues } from "src/components/Pages/AuthPage"
import { SignUpFields, SignUpSteps } from "src/components/Pages/AuthPage/SignUpFields"
import { getPartialAuthValidationSchema } from "src/components/Pages/AuthPage/validationSchema"
import { FormikContext } from "src/store/contexts/FormikContext"
import { AppState } from "src/store/reducers/rootReducer"
import { memberDownloadToUpload } from "src/utils/memberDownloadToUpload"
import * as yup from "yup"

import { editProfile } from "../../../../store/actions/authActions"
import { AuthTypes, ICells, IMemberDownload, IMemberUpload } from "../../../../types"
import { getName } from "../../Lists/listUtils"
import { CellAllocationDialog } from "../CellAllocationDialog"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      width: "100%",
      // height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      color: theme.palette.common.white,
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
    saveButton: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
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

export interface ProfileDialogContentsProps {
  member: IMemberDownload
  open: boolean
  handleClose: () => void
  onExited: () => void
}

const updateProfileValidationSchema = yup.object<Partial<IMemberUpload>>(
  getPartialAuthValidationSchema([
    "nameKor",
    "dob",
    "nameEng",
    "gender",
    "phoneNumber",
    "faithStart",
    "londonPurpose",
    "occupation",
  ])
)

export const ProfileDialogContents: FC<ProfileDialogContentsProps> = (
  props
) => {
  const theme = useTheme()
  const classes = useStyles()
  const [openCellAlllocationDialog, setOpenCellAlllocationDialog] =
    useState(false)
  const isAdmin = useSelector<AppState, boolean>((state) =>
    state.firestore.data.access?.admins.admins.includes(state.firebase.auth.uid)
  )
  const cells: ICells = useSelector<AppState, ICells>(
    (state) => state.firestore.data.cells?.cells
  )
  const dispatch = useDispatch()
  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"))
  const [edit, setEdit] = React.useState<boolean>(false)
  const [localImage, setLocalImage] = React.useState<{
    file: File | null
    url: string
  }>({
    file: null,
    url: "",
  })
  const [progress, setProgress] = React.useState<number>(0)

  const [member, setMember] = React.useState<IMemberUpload>(
    memberDownloadToUpload(props.member)
  )

  const [deleteImage, setDeleteImage] = React.useState<boolean>(false)

  const handleCloseAndReset = (resetForm: () => void) => () => {
    props.handleClose()
    resetForm()
  }

  const onSubmit = (
    member: IMemberUpload,
    { resetForm }: FormikHelpers<IMemberUpload>
  ) => {
    console.log("submit")
    dispatch(
      editProfile({
        member,
        image: localImage,
        deleteImage,
        setProgress,
        handleClose: props.handleClose,
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
      // setUpdating(true)
    }
    reader.onloadend = (e) => {
      const imageUrl = typeof reader.result === "string" ? reader.result : ""
      setLocalImage({ ...localImage, file: imageFile, url: imageUrl })
      // setUpdating(false)
    }
    const result = imageFile ? reader.readAsDataURL(imageFile) : ""
  }

  return (
    <Formik<IMemberUpload>
      validateOnChange
      initialValues={{
        ...initialValues,
        ...memberDownloadToUpload(props.member),
      }}
      validationSchema={updateProfileValidationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        isValid,
        dirty,
        isSubmitting,
        submitForm,
        setValues,
        resetForm,
      }) => (
        <Form>
          <Dialog
            fullScreen={!desktopMode}
            open={props.open}
            onClose={handleCloseAndReset(resetForm)}
            aria-labelledby="form-dialog-title"
            onExited={props.onExited}
          >
            <LoadingBackdrop open={isSubmitting} />
            <DialogTitle disableTypography id="form-dialog-title">
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton
                    onClick={handleClickEdit}
                    className={classes.edit}
                    aria-label="settings"
                  >
                    {edit ? <VisibilityIcon /> : <EditIcon />}
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" align="center">
                    {`${getName(member)} Profile`}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={handleCloseAndReset(resetForm)}
                    className={classes.return}
                    aria-label="return"
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>

            <DialogContent>
              <CellAllocationDialog
                cellCurrent={props.member.cell}
                open={openCellAlllocationDialog}
                handleClose={() => setOpenCellAlllocationDialog(false)}
                onConfirm={(chosenCellId) =>
                  setValues({
                    ...values,
                    cell: chosenCellId,
                    cellRequest: chosenCellId,
                  })
                }
              />
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
                          alt={getName(member)}
                          className={classes.image}
                        />
                      ) : (
                        !edit && <AccountCircleIcon fontSize="large" />
                      )}
                      {edit && (
                        <div className={classes.overlay}>
                          {isSubmitting ? (
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
                                  color="inherit"
                                >
                                  CHOOSE PHOTO
                                </Button>
                              </label>
                              {props.member.photoUrl && (
                                <Button
                                  startIcon={<DeleteIcon />}
                                  onClick={() => setDeleteImage(true)}
                                  size="large"
                                  color="inherit"
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
                <FormikContext.Provider
                  value={{
                    textField: {
                      fullWidth: true,
                      ...(edit
                        ? {
                            variant: "outlined",
                          }
                        : {
                            InputProps: {
                              readOnly: true,
                              disableUnderline: true,
                            },
                          }),
                    },
                    datePicker: {
                      fullWidth: true,
                      ...(edit
                        ? {
                            inputVariant: "outlined",
                          }
                        : {
                            readOnly: true,
                            InputProps: {
                              disableUnderline: true,
                            },
                          }),
                    },
                    select: edit
                      ? {
                          variant: "outlined" as "outlined",
                        }
                      : {
                          readOnly: true,
                          disableUnderline: true,
                        },
                    radio: edit ? undefined : { onChange: undefined },
                    checkbox: edit ? undefined : { onChange: undefined },
                  }}
                >
                  {SignUpSteps.map((stepTitle, stepIndex) => (
                    <Fragment key={stepTitle}>
                      <Grid item xs={12}>
                        <Typography variant="h6" align="left">
                          <Box fontWeight="fontWeightBold" m={1}>
                            {stepTitle}
                          </Box>
                        </Typography>
                      </Grid>
                      {Object.keys(
                        SignUpFields(["cellRequest"])[stepIndex]
                      ).map((key) => {
                        const signUpField =
                          SignUpFields()[stepIndex][
                            key as keyof Partial<AuthTypes>
                          ]
                        return (
                          !["password", "agreeTAndC"].includes(key) && (
                            <Grid item xs={edit ? 12 : 11} key={key}>
                              {key === "email" && edit ? (
                                <FormikContext.Provider
                                  value={{
                                    textField: {
                                      fullWidth: true,
                                      variant: "outlined",
                                      disabled: true,
                                    },
                                  }}
                                >
                                  {signUpField}
                                </FormikContext.Provider>
                              ) : (
                                signUpField
                              )}
                            </Grid>
                          )
                        )
                      })}
                    </Fragment>
                  ))}
                </FormikContext.Provider>
              </Grid>
            </DialogContent>
            <DialogActions>
              {edit && (
                <Button
                  onClick={submitForm}
                  className={classes.saveButton}
                  disabled={isSubmitting}
                  disableElevation
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  SAVE
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}
