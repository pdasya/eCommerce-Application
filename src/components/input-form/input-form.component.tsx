import React, { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';
// import * as Yup from 'yup';

interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface IFormTemplateProperties {
  title: string;
  buttonText: string;
  fields: IFormField[];
  initialValues: Record<string, string>;
  // validationSchema: Yup.ObjectSchema;
  onSubmit: (values: Record<string, string>) => void;
}

/* eslint-disable max-lines-per-function */
export const FormTemplate: FC<IFormTemplateProperties> = ({
  title,
  buttonText,
  fields,
  initialValues,
  // validationSchema,
  onSubmit,
}) => (
  <Paper
    elevation={3}
    style={{
      padding: 20,
      maxWidth: 400,
      margin: '20px auto',
      border: '2px solid black',
    }}>
    <Typography variant="h2" align="center" gutterBottom>
      {title}
    </Typography>
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            {fields.map(field => (
              <Grid item xs={12} key={field.id}>
                <Field
                  as={TextField}
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  variant="standard"
                  error={touched[field.name] && Boolean(errors[field.name])}
                  helperText={touched[field.name] && errors[field.name]}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}>
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  </Paper>
);
