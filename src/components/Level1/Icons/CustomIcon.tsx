import { IconTypeMap } from "@material-ui/core"
import Icon, { IconProps } from "@material-ui/core/Icon"
import { OverridableComponent } from "@material-ui/core/OverridableComponent"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    icon: { textAlign: "center" },
    img: { display: "flex", height: "inherit", width: "inherit" },
  })
)

export interface CustomIconProps extends IconProps {
  src: string
  alt: string
}

export const CustomIcon: FC<CustomIconProps> = ({ src, alt, ...iconProps }) => {
  const classes = useStyles()
  return (
    <Icon {...iconProps} className={classes.icon}>
      <img src={src} alt={alt} className={classes.img} />
    </Icon>
  )
}
