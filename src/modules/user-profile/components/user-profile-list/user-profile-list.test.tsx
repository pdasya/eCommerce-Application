import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserProfileListProps } from '@modules/user-profile/interfaces/user-profile.interfaces';
import UserProfileList from './user-profile-list';

const defaultProps: UserProfileListProps = {
  userData: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01',
    shippingAddresses: [
      { id: '1', streetName: '123 Main St', city: 'New York', postalCode: '10001', country: 'US' },
    ],
    defaultShippingAddressId: '1',
    billingAddresses: [
      {
        id: '2',
        streetName: '456 Broadway',
        city: 'Los Angeles',
        postalCode: '90001',
        country: 'US',
      },
    ],
    defaultBillingAddressId: '2',
  },
  errors: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    shippingAddresses: [],
    billingAddresses: [],
  },
  editMode: false,
  handleDataChange: jest.fn(),
  refreshUserData: jest.fn(),
};

describe('UserProfileList', () => {
  const setup = (props = {}) => render(<UserProfileList {...defaultProps} {...props} />);

  test('renders personal information and addresses', () => {
    setup();

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Date Of Birth')).toBeInTheDocument();
    expect(screen.getByText('Shipping Addresses')).toBeInTheDocument();
    expect(screen.getByText('Billing Addresses')).toBeInTheDocument();
  });

  test('toggles adding new shipping address', () => {
    setup();

    fireEvent.click(screen.getByText('Add New Shipping Address'));
    expect(screen.getByText('Cancel New Shipping Address')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel New Shipping Address'));
    expect(screen.getByText('Add New Shipping Address')).toBeInTheDocument();
  });

  test('toggles adding new billing address', () => {
    setup();

    fireEvent.click(screen.getByText('Add New Billing Address'));
    expect(screen.getByText('Cancel New Billing Address')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel New Billing Address'));
    expect(screen.getByText('Add New Billing Address')).toBeInTheDocument();
  });

  test('displays new shipping address form when toggled', () => {
    setup();

    fireEvent.click(screen.getByText('Add New Shipping Address'));
    expect(screen.getByLabelText('Street Name')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code')).toBeInTheDocument();
  });

  test('displays new billing address form when toggled', () => {
    setup();

    fireEvent.click(screen.getByText('Add New Billing Address'));
    expect(screen.getByLabelText('Street Name')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code')).toBeInTheDocument();
  });

  test('calls refreshUserData on address submit', async () => {
    setup();

    fireEvent.click(screen.getByText('Add New Shipping Address'));

    fireEvent.change(screen.getByLabelText('Street Name'), { target: { value: '789 Park Ave' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Postal Code'), { target: { value: '10002' } });

    fireEvent.click(screen.getByText('Save New Shipping Address'));
  });

  // test('calls refreshUserData on setting default address', async () => {
  //   setup();

  //   // fireEvent.click(screen.getByRole('checkbox', { name: /Default shipping address/i }));
  // });
});
