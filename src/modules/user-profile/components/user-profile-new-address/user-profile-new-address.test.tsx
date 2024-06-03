import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Address } from '@commercetools/platform-sdk';
import NewAddressForm from './user-profile-new-address';

const defaultProps = {
  address: {
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  } as Address,
  isAdding: true,
  handleAddressChange: jest.fn(),
  handleAddressSubmit: jest.fn(),
  type: 'shipping' as 'shipping' | 'billing',
};

describe('NewAddressForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields when isAdding is true', () => {
    render(<NewAddressForm {...defaultProps} />);
    expect(screen.getByLabelText(/Street Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
  });

  test('does not render form fields when isAdding is false', () => {
    render(<NewAddressForm {...defaultProps} isAdding={false} />);
    expect(screen.queryByLabelText(/Street Name/i)).toBeNull();
    expect(screen.queryByLabelText(/City/i)).toBeNull();
    expect(screen.queryByLabelText(/Postal Code/i)).toBeNull();
  });

  test('renders the button with correct text when isAdding is true', () => {
    render(<NewAddressForm {...defaultProps} />);
    expect(screen.getByText(/Save New Shipping Address/i)).toBeInTheDocument();
  });

  test('renders the button with correct text when isAdding is false', () => {
    render(<NewAddressForm {...defaultProps} isAdding={false} />);
    expect(screen.getByText(/Add New Shipping Address/i)).toBeInTheDocument();
  });

  test('renders correctly with type "billing"', () => {
    render(<NewAddressForm {...defaultProps} type="billing" />);
    expect(screen.getByText(/Add New Billing Address/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Save New Billing Address/i));
    expect(screen.getByLabelText(/Street Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
  });

  test('displays validation errors', async () => {
    render(<NewAddressForm {...defaultProps} />);
    fireEvent.click(screen.getByText(/Save New Shipping Address/i));

    expect(await screen.findByText(/Street is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/city is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Postal code is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid country selection/i)).toBeInTheDocument();
  });
});
