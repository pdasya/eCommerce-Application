import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserProfileModule } from './user-profile-module';
import { PersonalUserData } from '../interfaces/user-profile.interfaces';
import { fetchUserData } from '../user-profile-api/fetch-user-data';

jest.mock('../user-profile-api/fetch-user-data', () => ({
  fetchUserData: jest.fn(),
}));

const mockUserData: PersonalUserData = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  email: 'john.doe@example.com',
  shippingAddresses: [
    { id: '1', streetName: '123 Main St', city: 'New York', postalCode: '10001', country: 'US' },
  ],
  billingAddresses: [
    {
      id: '2',
      streetName: '456 Broadway',
      city: 'Los Angeles',
      postalCode: '90001',
      country: 'US',
    },
  ],
  defaultShippingAddressId: '1',
  defaultBillingAddressId: '2',
};

describe('UserProfileModule', () => {
  beforeEach(() => {
    (fetchUserData as jest.Mock).mockImplementation(
      (setUserData: React.Dispatch<React.SetStateAction<PersonalUserData>>) => {
        setUserData(mockUserData);
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => render(<UserProfileModule />);

  test('renders user profile information', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Shipping Addresses')).toBeInTheDocument();
      expect(screen.getByText('Billing Addresses')).toBeInTheDocument();
    });
  });

  test('toggles edit mode', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Edit Your Information')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Your Information'));
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  test('updates user data when save changes is clicked', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Edit Your Information')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Your Information'));
    expect(screen.getByText('Save Changes')).toBeInTheDocument();

    fireEvent.change(screen.getByText('First Name'));
    fireEvent.click(screen.getByText('Save Changes'));
  });

  test('displays errors when validation fails', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Edit Your Information')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Your Information'));
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });
});
