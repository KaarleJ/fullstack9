import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, SelectField, RatingOption } from "../AddPatientModal/FormField";
import { Entry } from "../types"; 
import { useStateValue } from "../state";
import { TextField } from "../AddPatientModal/FormField";

import { Grid, Button } from "@material-ui/core";

export type EntryFormValues = Omit<Entry, 'id'>;
interface HealthCheckFormValues extends EntryFormValues {
  type: 'HealthCheck',
  healthCheckRating: number;
}
interface HospitalFormValues extends EntryFormValues {
  type: 'Hospital'
  dischargeDate: string,
  dischargeCriteria: string,
}
interface OccupationalFormValues extends EntryFormValues {
  type: 'OccupationalHealthcare',
  employerName: string;
  leaveStart: string,
  leaveEnd: string,
}

export type FormValues = HealthCheckFormValues | HospitalFormValues | OccupationalFormValues;

interface HospitalProps {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

interface HealthProps {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

interface HospitalProps {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

interface OccupationalProps {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
  { value: 0, label: 0 },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 4 },
];

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const AddEntryForm = ({ onSubmit, onCancel }: HospitalProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        type: 'Hospital',
        specialist: "",
        dischargeDate: '',
        dischargeCriteria: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is emty or invalid";
        const errors: { [field: string]: string } = {};
        if (!values.date || !isDate(values.date)) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.dischargeDate || !isDate(values.dischargeDate)) {
          errors.dischargeDate = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="description"
            placeholder="description"
            name="description"
            component={TextField}
          />
          <Field
            label="date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="specialist"
            placeholder="specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Dischage-date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Dischage-criteria"
            placeholder="discharge-criteria"
            name="dischargeCriteria"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export const AddHealthForm = ({ onSubmit, onCancel }: HealthProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        type: 'HealthCheck',
        specialist: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is empty or invalid";
        const errors: { [field: string]: string } = {};
        if (!values.date || !isDate(values.date)) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist= requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="description"
            placeholder="description"
            name="description"
            component={TextField}
          />
          <Field
            label="date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="specialist"
            placeholder="specialist"
            name="specialist"
            component={TextField}
          />
          <SelectField label="Healthcheck rating" name="healthCheckRating" options={ratingOptions} />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export const AddOccupationalForm = ({ onSubmit, onCancel }: OccupationalProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        type: 'OccupationalHealthcare',
        specialist: "",
        employerName: '',
        leaveStart: '',
        leaveEnd: '',
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is empty or invalid";
        const errors: { [field: string]: string } = {};
        if (!values.date || !isDate(values.date)) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName=requiredError;
        }
        if ((!values.leaveStart && values.leaveEnd) || (values.leaveStart && !values.leaveEnd)) {
          errors.leaveStart = 'Fill both fields or leave them empty';
          errors.leaveEnd = 'Fill both fields or leave them empty';
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="description"
            placeholder="description"
            name="description"
            component={TextField}
          />
          <Field
            label="date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="specialist"
            placeholder="specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Name of employer"
            placeholder="employer"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Start of sickleave"
            placeholder="YYYY-MM-DD"
            name="leaveStart"
            component={TextField}
          />
          <Field
            label="End of sickleave"
            placeholder="YYYY-MM-DD"
            name="leaveEnd"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};