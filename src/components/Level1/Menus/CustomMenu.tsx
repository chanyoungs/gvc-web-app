import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import React, { FC } from "react"

interface CustomMenuProps {
  edge?: false | "start" | "end" | undefined
  menus: { label: string; onClick: () => void }[]
  icon: JSX.Element
}

export const CustomMenu: FC<CustomMenuProps> = ({ edge, menus, icon }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (onClick?: () => void) => () => {
    onClick && onClick()
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        edge={edge}
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose()}
      >
        {menus.map((menu) => (
          <MenuItem key={menu.label} onClick={handleClose(menu.onClick)}>
            {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
