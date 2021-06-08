import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { CustomMenu } from "src/components/Level1/Menus/CustomMenu"
import { OPEN_PROFILE_DIALOG } from "src/store/actions/types"
import { IMemberDownload } from "src/types"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileMenuProps {
  memberId: string
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ memberId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const menus = [
    {
      label: "Profile",
      onClick: () => {
        dispatch({ type: OPEN_PROFILE_DIALOG, payload: memberId })
      },
    },
    { label: "Edit", onClick: () => {} },
  ]
  return <CustomMenu menus={menus} icon={<MoreVertIcon />} edge="end" />
}
