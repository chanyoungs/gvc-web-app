import { createMuiTheme } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { createStyles, makeStyles, Theme, ThemeOptions } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import ReactJsonEditor from "jsoneditor-for-react"
import React, { FC, Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { FontDialog } from "src/components/Level1/Dialogs/FontDialog"
import { deleteTheme, setCurrentThemeName, uploadTheme } from "src/store/actions/themeActions"
import { Themes } from "src/types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
      padding: theme.spacing(2),
    },
  })
)

export interface IPThemeEditor {
  currentThemeName: string
  themes: Themes
}

export const ThemeEditor: FC<IPThemeEditor> = ({
  currentThemeName,
  themes,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentThemeNameState, setCurrentThemeNameState] = useState<string>(
    currentThemeName
  )
  const [createNewThemeMode, setCreateNewThemeMode] = useState<boolean>(false)
  const [newThemeName, setNewThemeName] = useState<string>(currentThemeName)

  const [currentThemeValues, setCurrentThemeValues] = useState<{
    input: string
    output: string
  }>(themes[currentThemeName])

  const [JSONErrorMessage, setJSONErrorMessage] = useState<string>("")

  const prettifyJSONString = (s: string) => {
    try {
      const json = JSON.parse(s)
      setJSONErrorMessage("")
      return JSON.stringify(json, null, 2)
    } catch (e) {
      setJSONErrorMessage(e.message)
      return s
    }
  }

  const getCurrentTheme = (name: string) =>
    createNewThemeMode ? { input: "{}", output: "{}" } : themes[name]

  const handleCurrentThemeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setJSONErrorMessage("")

    let chosenTheme = event.target.value
    if (chosenTheme === "New...") {
      setCreateNewThemeMode(true)
      setNewThemeName("")
      setCurrentThemeValues({ input: "{}", output: "{}" })
    } else {
      setCreateNewThemeMode(false)
      setNewThemeName(chosenTheme as string)
      dispatch(setCurrentThemeName(chosenTheme as string))
      setCurrentThemeValues(getCurrentTheme(chosenTheme as string))
    }
    setCurrentThemeNameState(chosenTheme as string)
  }

  const getMenus = () => {
    let menus = ["New...", "Default"]
    if (themes) {
      return [
        ...menus,
        ...Object.keys(themes)
          .filter((theme) => theme !== "Default" && themes[theme] !== null)
          .sort(),
      ]
    } else {
      return menus
    }
  }

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={currentThemeNameState}
              onChange={handleCurrentThemeChange}
            >
              {getMenus().map((name) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            value={newThemeName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewThemeName(event.target.value)
            }}
            label="Save as..."
            error={newThemeName === ""}
            helperText={
              newThemeName === "" ? "Please write a name to save" : ""
            }
          />
        </Grid>
        <Grid item>
          <FontDialog />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={currentThemeValues.input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              prettifyJSONString(event.target.value)
              setCurrentThemeValues({
                input: event.target.value,
                output: event.target.value,
              })
            }}
            label="Input JSON"
            multiline
            rows={4}
            rowsMax={10}
            fullWidth
            error={JSONErrorMessage !== ""}
            helperText={JSONErrorMessage}
            disabled={!createNewThemeMode}
          />
        </Grid>
        <Grid item>
          {newThemeName !== "Default" && (
            <Button
              onClick={() => {
                let theme = {
                  input: prettifyJSONString(currentThemeValues.input),
                  output: prettifyJSONString(currentThemeValues.output),
                }

                dispatch(
                  uploadTheme({
                    name: newThemeName,
                    theme,
                    callback: () => {
                      setCreateNewThemeMode(false)
                    },
                  })
                )
                dispatch(setCurrentThemeName(newThemeName as string))
                setCurrentThemeNameState(newThemeName)
                setCurrentThemeValues(theme)
              }}
              disabled={
                newThemeName === "Default" ||
                newThemeName === "" ||
                JSONErrorMessage !== ""
              }
              variant="contained"
              color="primary"
            >
              {"SAVE & Apply"}
            </Button>
          )}
        </Grid>
        <Grid item>
          {currentThemeNameState !== "Default" && !createNewThemeMode && (
            <Button
              onClick={() => {
                dispatch(setCurrentThemeName("Default"))
                setNewThemeName("Default")
                setCurrentThemeNameState("Default")
                dispatch(deleteTheme(newThemeName))
                setCurrentThemeValues({ input: "{}", output: "{}" })
              }}
              disabled={
                currentThemeNameState === "Default" && !createNewThemeMode
              }
              variant="contained"
              color="secondary"
            >
              DELETE
            </Button>
          )}
        </Grid>
        {createNewThemeMode && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setCurrentThemeValues((prevState) => ({
                  ...prevState,
                  input: prettifyJSONString(currentThemeValues.input),
                }))
              }}
              disabled={JSONErrorMessage !== "" || !createNewThemeMode}
            >
              Auto Format JSON
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          {!createNewThemeMode && (
            <ReactJsonEditor
              values={createMuiTheme(
                JSON.parse(getCurrentTheme(currentThemeNameState).output)
              )}
              onChange={(values) =>
                setCurrentThemeValues((prevState) => ({
                  ...prevState,
                  output: JSON.stringify(values),
                }))
              }
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}
