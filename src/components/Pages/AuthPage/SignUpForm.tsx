import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import MobileStepper from "@material-ui/core/MobileStepper"
import { useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import React, { FC, Fragment } from "react"
import { AuthTypes } from "src/types"
import { localise } from "src/utils/localisation"

import { SignUpFields, SignUpSteps } from "./SignUpFields"


// const useStyles = makeStyles<Theme>((theme) =>
//   createStyles({
//     icon: { textAlign: "center" },
//     img: { height: "100%" },
//   })
// )

export interface SignUpFormProps {
  activeStep: number
  onNext: () => void
  onBack: () => void
}

const activeSteps = 2

export const SignUpForm: FC<SignUpFormProps> = ({
  activeStep,
  onNext,
  onBack,
}) => {
  // const classes = useStyles()
  const theme = useTheme()

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold" m={1}>
            {SignUpSteps[activeStep]}
          </Box>
        </Typography>
      </Grid>
      {Object.keys(SignUpFields(["cell"])[activeStep]).map((key) => (
        <Grid item xs={12} key={key}>
          {SignUpFields()[activeStep][key as keyof Partial<AuthTypes>]}
        </Grid>
      ))}
      {/* {field()} */}
      <Grid item xs={12}>
        <MobileStepper
          variant="progress"
          steps={4}
          position="static"
          activeStep={activeStep + 1}
          nextButton={
            <Button
              size="small"
              onClick={onNext}
              disabled={activeStep === activeSteps}
            >
              {localise({ english: "Next", korean: "다음" })}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={onBack} disabled={activeStep === 0}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowLeftIcon />
              )}
              {localise({ english: "Back", korean: "이전" })}
            </Button>
          }
        />
      </Grid>
    </Fragment>
  )
}
