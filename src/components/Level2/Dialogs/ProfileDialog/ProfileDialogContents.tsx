import Avatar from "@material-ui/core/Avatar"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ImageIcon from "@material-ui/icons/Image"
import UndoIcon from "@material-ui/icons/Undo"
import VisibilityIcon from "@material-ui/icons/Visibility"
import { Form, Formik, FormikHelpers } from "formik"
import React, { FC, Fragment } from "react"
import { useDispatch } from "react-redux"
import { LoadingBackdrop } from "src/components/Level1/Backdrops/LoadingBackdrop"
import { initialValues } from "src/components/Pages/AuthPage"
import { SignUpFields, SignUpSteps } from "src/components/Pages/AuthPage/SignUpFields"
import { getPartialAuthValidationSchema } from "src/components/Pages/AuthPage/validationSchema"
import { CLOSE_PROFILE_DIALOG, UNMOUNT_PROFILE_DIALOG } from "src/store/actions/types"
import { FormikContext } from "src/store/contexts/FormikContext"
import { localise } from "src/utils/localisation"
import { memberWithIdToDate } from "src/utils/membersConversion"
import * as yup from "yup"

import { editProfile } from "../../../../store/actions/authActions"
import { AuthTypes, IMemberDate, IMemberWithId } from "../../../../types"
import { getName } from "../../Lists/listUtils"

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
    avatarSuperContainer: {
      padding: "10% 20% 10% 20%",
    },
    avatarContainer: {
      position: "relative",
      width: "100%",
      paddingTop: "100%",
    },
    avatar: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
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
  member: IMemberWithId
  open: boolean
}

const updateProfileValidationSchema = yup.object<Partial<IMemberDate>>(
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
  const [, setProgress] = React.useState<number>(0)

  const [member] = React.useState<IMemberDate>(memberWithIdToDate(props.member))

  const [deleteImage, setDeleteImage] = React.useState<boolean>(false)

  const handleClose = () => dispatch({ type: CLOSE_PROFILE_DIALOG })
  const onExited = () => dispatch({ type: UNMOUNT_PROFILE_DIALOG })

  const handleCloseAndReset = (resetForm: () => void) => () => {
    handleClose()
    resetForm()
  }

  const onSubmit = (
    member: IMemberDate,
    { resetForm }: FormikHelpers<IMemberDate>
  ) => {
    console.log("submit")
    dispatch(
      editProfile({
        member,
        image: localImage,
        deleteImage,
        setProgress,
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
      // setUpdating(true)
    }
    reader.onloadend = (e) => {
      const imageUrl = typeof reader.result === "string" ? reader.result : ""
      setLocalImage({ ...localImage, file: imageFile, url: imageUrl })
      // setUpdating(false)
    }
    // const result = imageFile ? reader.readAsDataURL(imageFile) : ""
  }

  return (
    <Formik<IMemberDate>
      validateOnChange
      initialValues={{
        ...initialValues,
        ...memberWithIdToDate(props.member),
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
            onExited={onExited}
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
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item xs={12}>
                  <div className={classes.avatarSuperContainer}>
                    <div className={classes.avatarContainer}>
                      <Avatar className={classes.avatar}>
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
                                {localise({
                                  english: "UNDO DELETE",
                                  korean: "삭제 취소",
                                })}
                              </Button>
                            </div>
                          )
                        ) : (
                          <div className={classes.imageContainer}>
                            {localImage.url || member.photoUrl ? (
                              // <div />
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
                                        {localise({
                                          english: "CHOOSE PHOTO",
                                          korean: "이미지 고르기",
                                        })}
                                      </Button>
                                    </label>
                                    {props.member.photoUrl && (
                                      <Button
                                        startIcon={<DeleteIcon />}
                                        onClick={() => setDeleteImage(true)}
                                        size="large"
                                        color="inherit"
                                      >
                                        {localise({
                                          english: "DELETE PHOTO",
                                          korean: "이미지 삭제",
                                        })}
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </Avatar>
                    </div>
                  </div>
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
                  {localise({ english: "SAVE", korean: "저장" })}
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}
