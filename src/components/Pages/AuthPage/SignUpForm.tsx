import Button from "@material-ui/core/Button"
import MobileStepper from "@material-ui/core/MobileStepper"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import React, { FC, Fragment, useState } from "react"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: { flexGrow: 1 },
    stepper: { flexGrow: 1 },
  })
)

export interface SignUpFormProps {}

const activeSteps = 2

export const SignUpForm: FC<SignUpFormProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)

  const title = () => {
    switch (activeStep) {
      case 0:
        return "1. Basic info"
      case 1:
        return "2. Additional info"
      case 2:
        return "3. For reference"
      default:
        return "Error"
    }
  }

  return (
    <div className={classes.root}>
      <Typography>{title()}</Typography>
      <MobileStepper
        LinearProgressProps={{ color: "secondary" }}
        variant="progress"
        steps={activeSteps + 1}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
        nextButton={
          <Button
            size="small"
            onClick={() => {
              activeStep < activeSteps && setActiveStep(activeStep + 1)
            }}
            disabled={activeStep === activeSteps}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => {
              activeStep > 0 && setActiveStep(activeStep - 1)
            }}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}
