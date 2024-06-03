import * as Yup from 'yup';

const minPasswordLength = 8;
const minStreetNameLength = 1;
const minAge = 13;

const emailValidationSchema = Yup.string()
  .test('Check email', 'Email should not contain spaces', value => !value?.includes(' '))
  .matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)$/,
    'Email must be at example user@example.com',
  )
  .required('Email is required');

const passwordValidationSchema = Yup.string()
  .min(minPasswordLength, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  )
  .test('Check password', 'Password should not contain spaces', value => !value?.includes(' '))
  .required('Password is required');

const firstNameValidationSchema = Yup.string()
  .matches(/^[A-Za-z]+$/, 'First name must contain only alphabetic characters')
  .required('First name is required');

const lastNameValidationSchema = Yup.string()
  .matches(/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters')
  .required('Last name is required');

const dateOfBirthValidationSchema = Yup.date()
  .max(
    new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
    `You must be at least ${minAge} years old`,
  )
  .min(
    new Date(new Date().setFullYear(1900, 0, 1)),
    'Date of birth cannot be before January 1, 1900',
  )
  .test('year-length-check', 'Year must be no more than four digits', value => {
    if (value) {
      const year = value.getFullYear().toString();
      return year.length <= 4;
    }
    return false;
  })
  .typeError('Date of birth is required')
  .required('Date of birth is required');

const shippingStreetValidationSchema = Yup.string()
  .min(minStreetNameLength, 'Street must contain at least one character')
  .required('Shipping street is required');

const shippingCityValidationSchema = Yup.string()
  .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
  .required('City is required');

const shippingPostalCodeValidationSchema = Yup.string()
  .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
  .required('Billing postal code is required');

const shippingCountryValidationSchema = Yup.string()
  .oneOf(['US', 'CA'], 'Invalid country selection')
  .required('Billing country is required');

const billingStreetValidationSchema = Yup.string()
  .min(minStreetNameLength, 'Street must contain at least one character')
  .required('Billing street is required');

const billingCityValidationSchema = Yup.string()
  .matches(/^[A-Za-z]+$/, 'City must contain only alphabetic characters')
  .required('City is required');

const billingPostalCodeValidationSchema = Yup.string()
  .matches(/^\d{5}(-\d{4})?$/, 'Postal code must be in the format 12345 or 12345-6789')
  .required('Billing postal code is required');

const billingCountryValidationSchema = Yup.string()
  .oneOf(['US', 'CA'], 'Invalid country selection')
  .required('Billing country is required');

export const baseSchema = {
  email: emailValidationSchema,
  password: passwordValidationSchema,
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
  dateOfBirth: dateOfBirthValidationSchema,
  shippingStreet: shippingStreetValidationSchema,
  shippingCity: shippingCityValidationSchema,
  shippingPostalCode: shippingPostalCodeValidationSchema,
  shippingCountry: shippingCountryValidationSchema,
};

export const addressValidationSchema = Yup.object().shape({
  streetName: shippingStreetValidationSchema,
  city: shippingCityValidationSchema,
  postalCode: shippingPostalCodeValidationSchema,
  country: shippingCountryValidationSchema,
});

export const baseSchemaUser = Yup.object().shape({
  email: emailValidationSchema,
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
  dateOfBirth: dateOfBirthValidationSchema,
  shippingAddresses: Yup.array().of(addressValidationSchema),
  billingAddresses: Yup.array().of(addressValidationSchema),
});

export const billingSchema = {
  billingStreet: billingStreetValidationSchema,
  billingCity: billingCityValidationSchema,
  billingPostalCode: billingPostalCodeValidationSchema,
  billingCountry: billingCountryValidationSchema,
};
