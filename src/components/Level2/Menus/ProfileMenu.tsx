import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { CustomMenu } from "src/components/Level1/Menus/CustomMenu"
import { OPEN_PROFILE_DIALOG } from "src/store/actions/types"
import { IMemberWithId } from "src/types"
import { localise } from "src/utils/localisation"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileMenuProps {
  member: IMemberWithId
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ member }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const menus = [
    {
      label: localise({ english: "Profile", korean: "프로필 보기" }),
      onClick: () => {
        dispatch({ type: OPEN_PROFILE_DIALOG, payload: member.id })
      },
    },
    {
      label: localise({ english: "Change cell", korean: "셀 배정" }),
      onClick: () => {},
    },
  ]
  return <CustomMenu menus={menus} icon={<MoreVertIcon />} edge="end" />
}
