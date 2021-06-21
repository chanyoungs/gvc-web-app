// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { localise } from "src/utils/localisation"

// const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface MyAccountPageProps {}

export interface ISMyAccountPage {}

export const MyAccountPage: FC<MyAccountPageProps> = (props) => {
  // const classes = useStyles()
  

  return (
    <Fragment>
      <AppBarMain
        title={localise({ english: "My Account", korean: "내 계정" })}
      />
      <ContainerMain>My Account Page</ContainerMain>
    </Fragment>
  )
}
