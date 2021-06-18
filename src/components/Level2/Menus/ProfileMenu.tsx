import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { CustomMenu } from "src/components/Level1/Menus/CustomMenu"
import { OPEN_PROFILE_DIALOG } from "src/store/actions/types"
import { IMemberWithId } from "src/types"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileMenuProps {
  member: IMemberWithId
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ member }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const menus = [
    {
      label: "Profile",
      onClick: () => {
        dispatch({ type: OPEN_PROFILE_DIALOG, payload: member.id })
      },
    },
    { label: "Change cell", onClick: () => {} },
  ]
  return <CustomMenu menus={menus} icon={<MoreVertIcon />} edge="end" />
}
