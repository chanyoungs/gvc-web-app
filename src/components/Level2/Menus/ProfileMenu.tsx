import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { FC } from "react"
import { CustomMenu } from "src/components/Level1/Menus/CustomMenu"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileMenuProps {}

export const ProfileMenu: FC<ProfileMenuProps> = ({}) => {
  const classes = useStyles()
  const menus = [
    { label: "Profile", onClick: () => {} },
    { label: "Edit", onClick: () => {} },
  ]
  return <CustomMenu menus={menus} icon={<MoreVertIcon />} edge="end" />
}
