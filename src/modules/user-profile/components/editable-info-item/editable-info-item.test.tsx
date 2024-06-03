import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Person as PersonIcon } from '@mui/icons-material';
import EditableInfoItem from './editable-info-item';
import '@testing-library/jest-dom';

const defaultProps = {
  icon: PersonIcon,
  label: 'First Name',
  value: 'John',
  editMode: false,
  onChange: jest.fn(),
  type: 'text',
  options: [],
  error: '',
};

describe('EditableInfoItem', () => {
  test('renders correctly in view mode', () => {
    render(<EditableInfoItem {...defaultProps} />);
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  test('renders correctly in edit mode with text input', () => {
    render(<EditableInfoItem {...defaultProps} editMode />);
    expect(screen.getByText('First Name', { selector: 'h6' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  });

  test('calls onChange when text input changes', () => {
    render(<EditableInfoItem {...defaultProps} editMode />);
    fireEvent.change(screen.getByDisplayValue('John'), { target: { value: 'Jane' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('Jane');
  });

  test('displays error message', () => {
    render(<EditableInfoItem {...defaultProps} editMode error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
