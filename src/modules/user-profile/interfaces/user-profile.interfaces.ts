import { SvgIconProps } from '@mui/material';

export interface UserData {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string;
  shippingStreet: string | undefined;
  shippingCity: string | undefined;
  shippingPostalCode: string | undefined;
  shippingCountry: string;
  isShippingAddressDefault: boolean;
  billingStreet: string | undefined;
  billingCity: string | undefined;
  billingPostalCode: string | undefined;
  billingCountry: string;
  isBillingAddressDefault: boolean;
}

interface MyCustomerSetFirstNameAction {
  action: 'setFirstName';
  firstName: string;
}

interface MyCustomerSetLastNameAction {
  action: 'setLastName';
  lastName: string;
}

interface MyCustomerSetEmailAction {
  action: 'changeEmail';
  email: string;
}

interface MyCustomerSetDateOfBirthAction {
  action: 'setDateOfBirth';
  dateOfBirth: string;
}

export type MyCustomerUpdateAction =
  | MyCustomerSetFirstNameAction
  | MyCustomerSetLastNameAction
  | MyCustomerSetEmailAction
  | MyCustomerSetDateOfBirthAction;

export interface EditableInfoItemProps {
  icon: React.ComponentType<SvgIconProps>;
  label: string;
  value: string | undefined;
  editMode: boolean;
  onChange: (value: string) => void;
  type?: string;
  options?: string[];
  error?: string;
}

export interface Errors {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

export interface UserProfileListProps {
  userData: UserData;
  errors: Errors;
  editMode: boolean;
  handleDataChange: (field: string) => (value: string) => void;
}
