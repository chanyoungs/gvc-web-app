// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, { Fragment } from "react"

import { getNameInitialLetter } from "../../../utils/getNameInitialLetter"

// const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface Props {}

export interface State {
  text: string
}

function GetNameInitialLetter(props: Props) {
  // const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    text: "박주영"
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ text: event.target.value })
  }

  return (
    <Fragment>
      <TextField
        label="Type a name"
        value={values.text}
        onChange={onChange}
        fullWidth
      />
      <Typography>-> {getNameInitialLetter(values.text)}</Typography>
    </Fragment>
  )
}

export { GetNameInitialLetter }
