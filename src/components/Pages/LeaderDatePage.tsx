import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface LeaderDatePageProps {}

export interface ISLeaderDatePage {}

export const LeaderDatePage: FC<LeaderDatePageProps> = (props) => {
  const classes = useStyles()
  const [values, setValues] = useState<ISLeaderDatePage>({})

  return (
    <Fragment>
      {/* <AppBarMain /> */}
      <ContainerMain>Leader Date Page</ContainerMain>
    </Fragment>
  )
}
