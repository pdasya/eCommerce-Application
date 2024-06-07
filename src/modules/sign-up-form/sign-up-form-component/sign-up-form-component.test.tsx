import * as Yup from 'yup';
import { getValidationSchema } from './sign-up-form-component';

// Тестовые данные
const validValues = {
  email: 'test@example.com',
  password: 'Password123',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '2000-01-01',
  shippingStreet: '123 Main St',
  shippingCity: 'NewYork',
  shippingPostalCode: '10001',
  shippingCountry: 'US',
  billingStreet: '123 Main St',
  billingCity: 'NewYork',
  billingPostalCode: '10001',
  billingCountry: 'US',
  setSameBillingAddress: false,
};

const invalidValues = {
  email: 'invalid-email',
  password: 'short',
  firstName: 'John1',
  lastName: 'Doe2',
  dateOfBirth: '2025-01-01',
  shippingStreet: '',
  shippingCity: 'New York1',
  shippingPostalCode: '1234',
  shippingCountry: 'InvalidCountry',
  billingStreet: '',
  billingCity: 'New York2',
  billingPostalCode: '5678',
  billingCountry: 'InvalidCountry',
  setSameBillingAddress: false,
};

// Функция для тестирования
const testValidation = async (values: Record<string, string | boolean>) => {
  try {
    await getValidationSchema(values).validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    const errors: Record<string, string> = {};
    if (err.inner) {
      err.inner.forEach((error: Yup.ValidationError) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
    }
    return errors;
  }
};

describe('Validation Schema', () => {
  it('should pass with valid values', async () => {
    const errors = await testValidation(validValues);
    expect(errors).toEqual({});
  });

  it('should fail with invalid values', async () => {
    const errors = await testValidation(invalidValues);
    expect(errors).toEqual({
      email: 'Email must be at example user@example.com',
      password:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      firstName: 'First name must contain only alphabetic characters',
      lastName: 'Last name must contain only alphabetic characters',
      dateOfBirth: 'You must be at least 13 years old',
      shippingStreet: 'Street is required',
      shippingCity: 'City must contain only alphabetic characters',
      shippingPostalCode: 'Postal code must be in the format 12345 or 12345-6789',
      shippingCountry: 'Invalid country selection',
      billingStreet: 'Street is required',
      billingCity: 'City must contain only alphabetic characters',
      billingPostalCode: 'Postal code must be in the format 12345 or 12345-6789',
      billingCountry: 'Invalid country selection',
    });
  });
});
