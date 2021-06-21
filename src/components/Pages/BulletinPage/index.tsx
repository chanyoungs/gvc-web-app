import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Form, Formik, FormikHelpers } from "formik"
import moment from "moment"
import React, { FC, Fragment } from "react"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { localise } from "src/utils/localisation"
import * as yup from "yup"

// import { Moment } from "moment"
// import { FormikDatePicker } from "src/components/Level1/DatePickers/FormikDatePicker"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)

export interface IBibleVerseRef {
  book: number
  chapter: number
  verse: number
}

export type Reading = { from: IBibleVerseRef; to: IBibleVerseRef }

export interface IBulletin {
  date: Date | null
  preacher: string
  praise: string
  choir: string
  readings: Reading[]
  sermon: string
  offeringHymn: string
  notices: string
  blessing: string
  benediction: string
}

const validationSchema = yup.object<Partial<IBulletin>>({
  date: yup.date().nullable(),
  preacher: yup.string().required(),
  praise: yup.string().required(),
  choir: yup.string().required(),
  sermon: yup.string().required(),
  offeringHymn: yup.string().required(),
  notices: yup.string().required(),
  blessing: yup.string().required(),
  benediction: yup.string().required(),
})

export const BulletinPage: FC = (props) => {
  const classes = useStyles()

  const initBibleVerseRef: IBibleVerseRef = {
    book: 0,
    chapter: 0,
    verse: 0,
  }

  const initialValues: IBulletin = {
    date: moment().toDate(),
    preacher: "",
    praise: "",
    choir: "",
    readings: [
      {
        from: initBibleVerseRef,
        to: { ...initBibleVerseRef, verse: 1 },
      },
    ],
    sermon: "",
    offeringHymn: "",
    notices: "",
    blessing: "",
    benediction: "",
  }

  const onSubmit = (
    values: IBulletin,
    { setSubmitting, setFieldValue }: FormikHelpers<IBulletin>
  ) => {
    // const {
    //   date,
    //   preacher,
    //   praise,
    //   choir,
    //   readings,
    //   sermon,
    //   offeringHymn,
    //   notices,
    //   blessing,
    //   benediction,
    // } = values
  }

  return (
    <Fragment>
      <AppBarMain title={localise({ english: "Bulletin", korean: "주보" })} />
      <ContainerMain>
        <Formik<IBulletin>
          validateOnChange
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, isValid, dirty, isSubmitting, setFieldValue }) => (
            <Form className={classes.root}></Form>
          )}
        </Formik>
      </ContainerMain>
    </Fragment>
  )
}
