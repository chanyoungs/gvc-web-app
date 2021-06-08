import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import SortIcon from "@material-ui/icons/Sort"
import React, { FC } from "react"
import { CustomMenu } from "src/components/Level1/Menus/CustomMenu"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface SortMenuProps {
  handleClick: (choice: "name" | "cell") => () => void
}

export const SortMenu: FC<SortMenuProps> = ({ handleClick }) => {
  const classes = useStyles()
  const menus = [
    { label: "By Name", onClick: handleClick("name") },
    { label: "By Cell", onClick: handleClick("cell") },
  ]
  return <CustomMenu menus={menus} icon={<SortIcon />} />
}