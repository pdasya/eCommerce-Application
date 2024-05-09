import React, { FC } from 'react';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';

interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IFormTemplateProperties {
  title: string;
  buttonText: string;
  fields: IFormField[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FormTemplate: FC<IFormTemplateProperties> = ({
  title,
  buttonText,
  fields,
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
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {fields.map(field => (
          <Grid item xs={12} key={field.id}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              required={field.required}
              value={field.value}
              onChange={field.onChange}
              variant="standard"
            />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
        {buttonText}
      </Button>
    </form>
  </Paper>
);
