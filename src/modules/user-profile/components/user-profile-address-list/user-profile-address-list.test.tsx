import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { Address } from '@commercetools/platform-sdk';
import { AddressListErrors } from '@modules/user-profile/interfaces/user-profile.interfaces';
import AddressList from './user-profile-address-list';

const defaultProps = {
  addresses: [
    {
      id: '1',
      streetName: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'US',
    },
    {
      id: '2',
      streetName: '456 Broadway',
      city: 'Los Angeles',
      postalCode: '90001',
      country: 'US',
    },
  ] as Address[],
  defaultAddressId: '1',
  errors: {} as AddressListErrors,
  editMode: false,
  handleDataChange: jest.fn(),
  handleDefaultChange: jest.fn(),
  handleDeleteAddress: jest.fn(),
  type: 'shipping' as 'shipping' | 'billing',
};

describe('AddressList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders shipping addresses', () => {
    render(<AddressList {...defaultProps} />);
    expect(screen.getByText('Shipping Addresses')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('10001')).toBeInTheDocument();
    expect(screen.getByText('456 Broadway')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('90001')).toBeInTheDocument();
  });

  test('renders billing addresses', () => {
    const billingProps = { ...defaultProps, type: 'shipping' as 'shipping' | 'billing' };
    render(<AddressList {...billingProps} />);
    expect(screen.getByText('Shipping Addresses', { selector: 'h6' })).toBeInTheDocument();
  });

  test('renders correctly in edit mode', () => {
    const editProps = { ...defaultProps, editMode: true };
    render(<AddressList {...editProps} />);
    expect(screen.getAllByRole('textbox').length).toBe(6);
    expect(screen.getAllByRole('combobox').length).toBe(2);
  });

  test('calls handleDefaultChange on checkbox change', () => {
    render(<AddressList {...defaultProps} />);
    fireEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(defaultProps.handleDefaultChange).toHaveBeenCalledWith('2');
  });

  test('displays errors when provided', () => {
    const errorProps = {
      ...defaultProps,
      errors: {
        shippingAddresses: [
          { streetName: 'Error on street name' },
          { city: 'Error on city name' },
        ],
      } as AddressListErrors,
      editMode: true,
    };
    render(<AddressList {...errorProps} />);
    expect(screen.getByText('Error on street name')).toBeInTheDocument();
    expect(screen.getByText('Error on city name')).toBeInTheDocument();
  });
});
