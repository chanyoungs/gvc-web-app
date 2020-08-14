import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import React, { FC } from "react"
import { useDispatch } from "react-redux"

import { updateNotice } from "../../../store/actions/noticeActions"
import { INotice, INoticeWithMeta } from "../../../types"

export interface EditNoticePaperProps {
  notice: INoticeWithMeta
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.grey[700],
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      height: "100%",
      margin: "10px",
    },
  })
)

export const EditNoticePaper: FC<EditNoticePaperProps> = ({ notice }) => {
  const classes = useStyles()
  const [values, setValues] = React.useState<INotice>({
    title: notice.title,
    content: notice.content,
  })

  React.useEffect(() => {
    setValues(notice)
  }, [notice])

  const onChange = (name: keyof INotice) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = (values: INoticeWithMeta) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setValues({
      title: "",
      content: "",
    })
    dispatch(updateNotice(values))
  }

  return (
    <Paper className={classes.paper}>
      <div data-testid="component-edit-noticepaper">
        <TextField
          data-testid="title"
          label="Title"
          fullWidth
          onChange={onChange("title")}
          value={values.title}
        />
        <TextField
          data-testid="content"
          id="standard-multiline-flexible"
          fullWidth
          multiline
          rowsMax="4"
          label="Content"
          onChange={onChange("content")}
          value={values.content}
        />
        <Button
          data-testid="submit"
          onClick={onSubmit({
            ...values,
            id: notice.id,
            createdAt: notice.createdAt,
          })}
        >
          Update notice
        </Button>
      </div>
    </Paper>
  )
}
