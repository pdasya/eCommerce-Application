import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { Address } from '@commercetools/platform-sdk';
import { AddressListErrors } from '@modules/user-profile/interfaces/user-profile.interfaces';
import AddressList from './user-profile-address-list';

const mockAddresses: Address[] = [
  {
    id: '1',
    streetName: '123 Main St',
    city: 'Springfield',
    postalCode: '12345',
    country: 'US',
  },
  {
    id: '2',
    streetName: '456 Elm St',
    city: 'Shelbyville',
    postalCode: '67890',
    country: 'US',
  },
];

const mockErrors: AddressListErrors = {
  shippingAddresses: [],
  billingAddresses: [],
};

const mockHandleDataChange = jest.fn();
const mockHandleDefaultChange = jest.fn();
const mockHandleDeleteAddress = jest.fn();

describe('AddressList', () => {
  test('renders no addresses message when addresses list is empty', () => {
    render(
      <AddressList
        addresses={[]}
        defaultAddressId={undefined}
        errors={mockErrors}
        editMode={false}
        handleDataChange={mockHandleDataChange}
        handleDefaultChange={mockHandleDefaultChange}
        handleDeleteAddress={mockHandleDeleteAddress}
        type="shipping"
      />,
    );

    expect(screen.getByText('No shipping addresses available.')).toBeInTheDocument();
  });

  test('renders address items when addresses list is not empty', () => {
    render(
      <AddressList
        addresses={mockAddresses}
        defaultAddressId="1"
        errors={mockErrors}
        editMode={false}
        handleDataChange={mockHandleDataChange}
        handleDefaultChange={mockHandleDefaultChange}
        handleDeleteAddress={mockHandleDeleteAddress}
        type="shipping"
      />,
    );

    expect(
      screen.getByText(
        content => content.includes('123 Main St street') && content.includes('Springfield city'),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        content => content.includes('456 Elm St street') && content.includes('Shelbyville city'),
      ),
    ).toBeInTheDocument();
  });

  // test('calls handleDefaultChange when default address checkbox is clicked', () => {
  //   render(
  //     <AddressList
  //       addresses={mockAddresses}
  //       defaultAddressId="1"
  //       errors={mockErrors}
  //       editMode={true}
  //       handleDataChange={mockHandleDataChange}
  //       handleDefaultChange={mockHandleDefaultChange}
  //       handleDeleteAddress={mockHandleDeleteAddress}
  //       type="shipping"
  //     />
  //   );

  //   const checkboxes = screen.getAllByRole('combobox');
  //   expect(checkboxes).toHaveLength(2);

  //   fireEvent.click(checkboxes[1]);

  //   expect(mockHandleDefaultChange).toHaveBeenCalledWith('2');
  // });

  // test('calls handleDeleteAddress when delete button is clicked', () => {
  //   render(
  //     <AddressList
  //       addresses={mockAddresses}
  //       defaultAddressId="1"
  //       errors={mockErrors}
  //       editMode={true}
  //       handleDataChange={mockHandleDataChange}
  //       handleDefaultChange={mockHandleDefaultChange}
  //       handleDeleteAddress={mockHandleDeleteAddress}
  //       type="shipping"
  //     />
  //   );

  //   const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  //   expect(deleteButtons).toHaveLength(2);

  //   fireEvent.click(deleteButtons[0]);

  //   expect(mockHandleDeleteAddress).toHaveBeenCalledWith('1', 'shipping');
  // });
});
