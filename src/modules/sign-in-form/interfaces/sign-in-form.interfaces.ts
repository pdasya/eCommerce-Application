import * as Yup from 'yup';

export interface IUserDraft {
  email: string;
  password: string;
  [key: string]: string;
}

export interface IFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISignInFormComponentProperties {
  title: string;
  buttonText: string;
  fields: IFormField[];
  initialValues: IUserDraft;
  validationSchema: Yup.ObjectSchema<IUserDraft>;
  onSubmit: (values: IUserDraft) => Promise<void>;
}
