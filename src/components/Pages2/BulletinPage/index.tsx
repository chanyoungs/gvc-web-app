import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPBulletinPage {}

export interface ISBulletinPage {}

export const BulletinPage: FC<IPBulletinPage> = (props) => {
  const classes = useStyles()
  const [values, setValues] = useState<ISBulletinPage>({})

  return (
    <Fragment>
      <AppBarMain title="주보" />
      <ContainerMain>주보</ContainerMain>
    </Fragment>
  )
}
