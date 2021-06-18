import Button from "@material-ui/core/Button"
import Textfield from "@material-ui/core/TextField"
import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { localise } from "src/utils/localisation"

import { createNotice } from "./../../store/actions/noticeActions"
import { INotice } from "./../../types"

export const NoticeCreator: React.FC = () => {
  const [values, setValues] = React.useState<INotice>({
    title: "",
    content: "",
  })

  const onChange =
    (name: keyof INotice) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value })
    }

  const dispatch = useDispatch()
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setValues({
      title: "",
      content: "",
    })

    dispatch(createNotice(values))
  }

  return (
    <Fragment>
      <Textfield
        data-testid="title"
        label="Title"
        fullWidth
        onChange={onChange("title")}
        value={values.title}
      />
      <Textfield
        data-testid="content"
        id="standard-multiline-flexible"
        fullWidth
        multiline
        rowsMax="4"
        label="Content"
        onChange={onChange("content")}
        value={values.content}
      />
      <Button data-testid="submit" onClick={onSubmit}>
        {localise({ english: "Create new notice", korean: "새 공지 만들기" })}
      </Button>
    </Fragment>
  )
}
